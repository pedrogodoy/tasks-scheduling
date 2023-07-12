import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, createConnection, getConnection, getRepository } from "typeorm";
import { Task } from '../tasks/entities/task.entity';

const createUserDto: CreateUserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  username: 'pedro',
  password: 'password',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: Repository<User>;
  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 'a9862a34-7a1a-44c2-9f8e-e77e88001cf2', ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                username: 'pedro',
                password: 'secret'
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
                username: 'pedro1',
                password: 'secret1'
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                username: 'pedro1',
                password: 'secret1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    

    usersService = app.get<UsersService>(UsersService);
    usersController = app.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  // describe('create()', () => {
  //   it('should create a user', () => {
  //     usersController.create(createUserDto);
  //     expect(usersController.create(createUserDto)).resolves.toEqual({
  //       id: '1',
  //       ...createUserDto,
  //     });
  //     expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  //   });
  // });

  // describe('findAll()', () => {
  //   it('should find all users ', () => {
  //     usersController.findAll();
  //     expect(usersService.findAll).toHaveBeenCalled();
  //   });
  // });

  // describe('findOne()', () => {
  //   it('should find a user', () => {
  //     expect(usersController.findOne('a9862a34-7a1a-44c2-9f8e-e77e88001cf2')).resolves.toEqual({
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: 'a9862a34-7a1a-44c2-9f8e-e77e88001cf2',
  //     });
  //     expect(usersService.findOne).toHaveBeenCalled();
  //   });
  // });

  // describe('remove()', () => {
  //   it('should remove the user', () => {
  //     usersController.remove('2');
  //     expect(usersService.remove).toHaveBeenCalled();
  //   });
  // });
});
