import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Track' })
  @ApiResponse({ status: 201, description: 'Track created successfully' })
  @ApiBody({ type: CreateTrackDto })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'List of all tracks' })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a track by ID' })
  @ApiResponse({ status: 200, description: 'Track found' })
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a track by ID' })
  @ApiResponse({ status: 200, description: 'Track updated successfully' })
  @ApiBody({ type: UpdateTrackDto })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track by ID' })
  @ApiResponse({ status: 200, description: 'Track deleted successfully' })
  remove(@Param('id') id: string) {
    return this.trackService.remove(+id);
  }
}
