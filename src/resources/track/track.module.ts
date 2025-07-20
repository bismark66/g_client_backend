import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaModule } from 'src/prisma-client/prisma-client.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
