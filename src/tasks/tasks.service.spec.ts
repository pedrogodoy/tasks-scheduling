import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksModule } from './tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('TasksService', () => {
  let service: TasksService;
  let userService: UsersService;

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
      providers: [TasksService, UsersService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    userService = module.get<UsersService>(UsersService);

    await userService.create({
      firstName: 'Pedro',
      lastName: 'Godoy',
      username: 'pedro',
      password: '123',
    })
  
  });

  afterEach(async () => {
    await sleep(200);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {

    const user = await userService.findAll();

    const task = await service.create({
      description: 'task',
      dueDate: '2022-04-13 13:00:00'
    }, user[0].id)


    expect(task.description).toBeDefined();
  });

  it('should not create a task without description', async () => {

    try {
      const user = await userService.findAll();

      const task = await service.create({
        description: null,
        dueDate: '2022-04-13 13:00:00'
      }, user[0].id)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    } 
  });
});
