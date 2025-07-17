import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma-client/prisma-client.service';
import { PrismaModule } from './prisma-client/prisma-client.module';
import { AdminModule } from './resources/admin/admin.module';
import { LearnerModule } from './resources/learner/learner.module';
import { TrackModule } from './resources/track/track.module';
import { CoursesModule } from './resources/courses/courses.module';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AdminModule,
    LearnerModule,
    TrackModule,
    CoursesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
