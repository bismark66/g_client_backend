import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({
      data: createTrackDto,
    });
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  findOne(id: number) {
    return this.prisma.track.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  remove(id: number) {
    return this.prisma.track.delete({
      where: { id },
    });
  }
}
