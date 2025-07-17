import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        description: createCourseDto.description,
        track_id: createCourseDto.trackId, // Use snake_case for direct field assignment
      },
    });
  }

  findAll() {
    return this.prisma.course.findMany({
      include: {
        track: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        track: true,
      },
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const updateData: any = {
      title: updateCourseDto.title,
      description: updateCourseDto.description,
    };

    if (updateCourseDto.trackId !== undefined) {
      updateData.track_id = updateCourseDto.trackId;
    }

    return this.prisma.course.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}