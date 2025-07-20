import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The title of the course',
    example: 'Introduction to NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the course',
    example: 'A comprehensive guide to building applications with NestJS.',
  })
  description: string;

  @ApiProperty({
    description: 'The ID of the track this course belongs to',
    example: 1,
  })
  trackId: number;
}
