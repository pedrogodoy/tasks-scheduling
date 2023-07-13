import { Test, TestingModule } from '@nestjs/testing';
import { TaskNotificationService } from './task-notification.service';
import { TasksModule } from '../tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/user.entity';

describe('TaskNotificationService', () => {
  let service: TaskNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TasksModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            name: (new Date().getTime() * Math.random()).toString(16),
            database: ':memory:',
            dropSchema: true,
            entities: [Task, User],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([Task, User]),
      ],
      providers: [TaskNotificationService, TasksService],
    }).compile();

    service = module.get<TaskNotificationService>(TaskNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
