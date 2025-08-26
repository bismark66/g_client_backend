/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma-client.service';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import Hash from 'src/utils/hash'; // Assuming you have a utility for hashing

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        // created_at: true,
        // updated_at: true,
        gender: true,
        location: true,
        contact_number: true,
        bio: true,
        role: true,
        // trackId: true,
        // track: true,
        password: true, // We still need password for verification
      },
    });

    if (!user || !(await Hash.compareString(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.first_name + ' ' + user.last_name,
      role: user.role,
    };

    // Create user object without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    userId: number, // Get userId as parameter
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify the old password matches
    const isOldPasswordValid = await Hash.compareString(
      oldPassword,
      user.password,
    );
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash and update the new password
    const hashedPassword = await Hash.hashString(newPassword);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}
