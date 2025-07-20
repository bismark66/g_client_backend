import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from 'src/prisma-client/prisma-client.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
