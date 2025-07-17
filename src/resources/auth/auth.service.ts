/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async signIn(email: string, pass: string, role: Role): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email, role },
    });
    if (!user || !(await Hash.compareString(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.first_name + ' ' + user.last_name,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
