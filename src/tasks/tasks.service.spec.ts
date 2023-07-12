import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksModule } from './tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/user.entity';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('TasksService', () => {
  let service: TasksService;

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
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(async () => {
    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
