import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { UsersModule } from './users.module';
import { Task } from '../tasks/entities/task.entity';

const userArray = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
  },
];

const oneUser = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    jest.useFakeTimers();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
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
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));

    await service.create({
      firstName: 'Pedro',
      lastName: 'Godoy',
      password: 'secret',
      username: 'pedro-global'
    })
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const user = await service.create({
        firstName: 'Pedro',
        lastName: 'Godoy',
        password: 'secret',
        username: 'pedro-service'
      })

      expect(user.firstName).toEqual('Pedro');
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {

      const users = await service.findAll();

      expect(users).toMatchObject([
        {
          firstName: 'Pedro',
          lastName: 'Godoy',
          username: 'pedro-global'
        }
      ])
    });
  });

  describe('findOne()', () => {
    it('should get a single user', async() => {
      const users = await service.findAll();

      const user = await service.findOne(users[0].id)

      expect(user).toMatchObject({
          firstName: 'Pedro',
          lastName: 'Godoy',
          username: 'pedro-global'
      })

    });
  });
});
