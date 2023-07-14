import { Module } from '@nestjs/common';
import { TaskNotificationService } from './task-notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TasksModule],
  providers: [TaskNotificationService, TasksService],
})
export class TaskNotificationModule {}
