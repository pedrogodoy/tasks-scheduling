import { Test, TestingModule } from '@nestjs/testing';
import { TaskNotificationService } from './task-notification.service';

describe('TaskNotificationService', () => {
  let service: TaskNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskNotificationService],
    }).compile();

    service = module.get<TaskNotificationService>(TaskNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
