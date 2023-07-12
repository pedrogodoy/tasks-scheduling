import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId?: string) {
    const task = new Task();
    Object.assign(task, createTaskDto)

    const savedTask = await this.tasksRepository.save({ ...task, user: { id: userId } });

    return savedTask;
  }

  findAll(userId: string) {
    return this.tasksRepository.find({ where: { user: { id: userId } } })
  }

  async findOne(id: string, userId: string) {
    return await this.tasksRepository.findOne({ where: { id: id, user: { id: userId } }});
  }

  async remove(id: string, userId: string) {
    const task = await this.findOne(id, userId);

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    await this.tasksRepository.delete({ id, user: { id: userId } });
  }
}
