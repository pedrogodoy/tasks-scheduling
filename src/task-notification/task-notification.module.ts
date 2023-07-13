import { Module } from '@nestjs/common';
import { TaskNotificationService } from './task-notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TaskNotificationController } from './task-notification.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TasksModule],
  providers: [TaskNotificationService, TasksService],
  controllers: [TaskNotificationController]
})
export class TaskNotificationModule {}
