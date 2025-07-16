import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearnerService } from './learner.service';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('learner')
@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new learner' })
  @ApiResponse({ status: 201, description: 'Learner created successfully' })
  @ApiBody({ type: CreateLearnerDto })
  create(@Body() createLearnerDto: CreateLearnerDto) {
    return this.learnerService.create(createLearnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learners' })
  @ApiResponse({ status: 200, description: 'List of all learners' })
  findAll() {
    return this.learnerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a learner by ID' })
  @ApiResponse({ status: 200, description: 'Learner found' })
  findOne(@Param('id') id: string) {
    return this.learnerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a learner by ID' })
  @ApiResponse({ status: 200, description: 'Learner updated successfully' })
  @ApiBody({ type: UpdateLearnerDto })
  update(@Param('id') id: string, @Body() updateLearnerDto: UpdateLearnerDto) {
    return this.learnerService.update(+id, updateLearnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a learner by ID' })
  @ApiResponse({ status: 200, description: 'Learner deleted successfully' })
  remove(@Param('id') id: string) {
    return this.learnerService.remove(+id);
  }
}
