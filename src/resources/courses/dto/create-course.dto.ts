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
    description: 'The duration of the course in hours',
    example: '8 weeks',
  })
  duration: string;

  @ApiProperty({
    description: 'The ID of the track this course belongs to',
    example: 1,
  })
  trackId: number;

  @ApiProperty({
    description: 'The ID of the admin who created the course',
    example: 1,
  })
  adminId: number;

  @ApiProperty({
    description: 'The price of the course',
    example: 99.99,
  })
  price: number;

  @ApiProperty({
    description: 'The status of the course',
    example: 'active',
  })
  status: string;
}
