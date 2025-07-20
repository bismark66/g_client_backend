import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    try {
      return this.prisma.course.create({
        data: {
          title: createCourseDto.title,
          description: createCourseDto.description,
          track_id: createCourseDto.trackId, // Use snake_case for direct field assignment
        },
      });
    } catch (error) {
      throw new NotFoundException(`Course creation failed: ${error}`);
    }
  }

  findAll() {
    return this.prisma.course.findMany({
      include: {
        track: true,
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        track: true,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    // Verify course exists first
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    const { trackId, ...rest } = updateCourseDto;

    return this.prisma.course.update({
      where: { id },
      data: {
        ...rest,
        ...(trackId !== undefined && { track_id: trackId }),
      },
    });
  }

  async remove(id: number) {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
