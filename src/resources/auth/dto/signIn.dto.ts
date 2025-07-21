import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
// import { Role } from '@prisma/client';

export class SignInDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  // @ApiProperty({ enum: ['learner', 'admin'] })
  // @IsString()
  // role: Role;
}
