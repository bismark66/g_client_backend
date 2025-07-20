import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAdminDto: CreateAdminDto) {
    return this.prisma.user.create({
      data: {
        ...createAdminDto,
        role: Role.ADMIN,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { role: Role.ADMIN },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id, role: Role.ADMIN },
    });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prisma.user.update({
      where: { id, role: Role.ADMIN },
      data: updateAdminDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id, role: Role.ADMIN },
    });
  }
}
