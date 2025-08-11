/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';
import { Role } from '@prisma/client';

@Injectable()
export class LearnerService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLearnerDto: CreateLearnerDto) {
    try {
      return this.prisma.user.create({
        data: {
          ...createLearnerDto,
          role: Role.LEARNER,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Learner creation failed: ${error}`);
    }
  }

  // findAll() {
  //   return this.prisma.user.findMany({
  //     where: { role: Role.LEARNER },
  //   });
  // }

  findAll() {
    return this.prisma.user
      .findMany({
        where: { role: Role.LEARNER },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          gender: true,
          created_at: true,
          trackId: true,
        },
      })
      .then((users) =>
        users.map((user) => ({
          id: user.id,
          learner: `${user.first_name} ${user.last_name}`,
          gender: user.gender,
          'joined at': user.created_at,
          track: user.trackId,
          amount: 0, // You can set default amount or calculate it
        })),
      );
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        AND: [{ id }, { role: Role.LEARNER }],
      },
    });

    if (!user) {
      throw new NotFoundException(`Learner not found`);
    }

    return user;
  }

  update(id: number, updateLearnerDto: UpdateLearnerDto) {
    return this.prisma.user.update({
      where: { id, role: Role.LEARNER },
      data: updateLearnerDto,
    });
  }

  remove(id: number) {
    const learner = this.prisma.user.findUnique({
      where: { id, role: Role.LEARNER },
    });
    if (!learner) {
      throw new NotFoundException(`Learner not found`);
    }

    return this.prisma.user.delete({
      where: { id, role: Role.LEARNER },
    });
  }
}
