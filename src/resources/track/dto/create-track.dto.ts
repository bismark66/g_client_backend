import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  track_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instructor: string;

  @ApiProperty({
    description: 'The price of the course',
    example: 99.99,
  })
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tools: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  period: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
