import { Test, TestingModule } from '@nestjs/testing';
import { TaskNotificationController } from './task-notification.controller';

describe('TaskNotificationController', () => {
  let controller: TaskNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskNotificationController],
    }).compile();

    controller = module.get<TaskNotificationController>(TaskNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
