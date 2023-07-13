import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import * as request from 'supertest';
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

    
    usersController = app.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

});
