import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from '../../prisma-client/prisma-client.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrackDto: CreateTrackDto) {
    try {
      return this.prisma.track.create({
        data: createTrackDto,
      });
    } catch (error) {
      throw new NotFoundException(`Track creation failed: ${error}`);
    }
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: number) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track  not found`);
    }
    return track;
  }

  async update(id: number, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track not found`);
    }

    return this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async remove(id: number) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track not found`);
    }
    return this.prisma.track.delete({
      where: { id },
    });
  }
}
