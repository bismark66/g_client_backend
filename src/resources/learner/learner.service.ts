/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';
import { Role } from '@prisma/client';

@Injectable()
export class LearnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLearnerDto: CreateLearnerDto) {
    const { courseIds, ...rest } = createLearnerDto;

    try {
      return await this.prisma.user.create({
        data: {
          ...rest,
          role: Role.LEARNER,
          courses:
            courseIds && courseIds.length > 0
              ? {
                  connect: courseIds.map((id) => ({ id })),
                }
              : undefined,
        },
        include: {
          courses: true, // Include the enrolled courses
        },
      });
    } catch (error) {
      // Handle specific Prisma errors
      if (error.code === 'P2025') {
        throw new NotFoundException('One or more courses not found');
      }
      throw new BadRequestException(
        `Learner creation failed: ${error.message}`,
      );
    }
  }

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
          courses: {
            select: {
              title: true, // pick only what you want from the course
            },
          },
        },
      })
      .then((users) =>
        users.map((user) => ({
          id: user.id,
          learner: `${user.first_name} ${user.last_name}`,
          gender: user.gender,
          'joined at': user.created_at,
          course: user?.courses?.length > 0 ? user?.courses[0].title : null, // flatten to single course
          amount: 0, // default or calculated value
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
