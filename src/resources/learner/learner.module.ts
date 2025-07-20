import { Module } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { LearnerController } from './learner.controller';
import { PrismaModule } from 'src/prisma-client/prisma-client.module';

@Module({
  imports: [PrismaModule],
  controllers: [LearnerController],
  providers: [LearnerService],
})
export class LearnerModule {}
