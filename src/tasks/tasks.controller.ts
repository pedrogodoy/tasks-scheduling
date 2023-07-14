import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskCreated } from './dto/task-created.dto';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 204, description: 'Created', type: TaskCreated })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() { user }, @Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, user.userId);
  }

  @ApiOperation({ summary: 'List all tasks' })
  @ApiOkResponse({
    status: 200,
    description: 'The tasks founded',
    type: TaskCreated,
    isArray: true
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() { user }) {
    return this.tasksService.findAll(user.userId);
  }

  @ApiOperation({ summary: 'Remove a task' })
  @ApiResponse({status: 200, description: 'Success'})
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() { user }, @Param('id') id: string) {
    return this.tasksService.remove(id, user.userId);
  }
}
