import { Injectable } from '@nestjs/common';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';
import { Role } from '@prisma/client';

@Injectable()
export class LearnerService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLearnerDto: CreateLearnerDto) {
    return this.prisma.user.create({
      data: {
        ...createLearnerDto,
        role: Role.LEARNER,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { role: Role.LEARNER },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id, role: Role.LEARNER },
    });
  }

  update(id: number, updateLearnerDto: UpdateLearnerDto) {
    return this.prisma.user.update({
      where: { id, role: Role.LEARNER },
      data: updateLearnerDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id, role: Role.LEARNER },
    });
  }
}
