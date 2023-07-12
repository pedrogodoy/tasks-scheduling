import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() { user }, @Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() { user }) {
    return this.tasksService.findAll(user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() { user }, @Param('id') id: string) {
    return this.tasksService.remove(id, user.userId);
  }
}
