import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class TaskNotificationService {
  private readonly logger = new Logger(TaskNotificationService.name);

  constructor(
    private readonly taskService: TasksService
  ) {}

  async sendNotifications(task: Task){
    // Put the notification strategy according to the client configuration (push notifications, websocket, etc)
    this.logger.debug(`Notification sent to user ${task.user.id}`);
    await this.taskService.updateNotification(task.id);
  }
  
  @Interval(5000)
  async handleInterval() {
    const tasksToSendNotification = await this.taskService.findTasksToSendNotification()
    tasksToSendNotification.forEach((task) => this.sendNotifications(task))
  }
}
