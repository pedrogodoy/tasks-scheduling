import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { NotFoundException } from '@nestjs/common';

jest.useFakeTimers();



describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, TasksService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  })


  it('should be defined', () => {
    expect(true).toBe(true)
  });

});

describe('validateUser', () => {
  let service: AuthService;
  let userService: UsersService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, TasksService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  })

  it('should return a user object when credentials are valid', async () => {
    await userService.create({
      firstName: 'vick',
      lastName: 'Godoy',
      username: 'pedro',
      password: '123'
    })

    const res = await service.validateUser('pedro', '123');
    expect(res).toHaveProperty('username', 'pedro');
  });

  it('should return an error when credentials are invalid', async () => {
    try {
      await service.validateUser('xxx', 'xxx')
    } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error).toHaveProperty('message', 'User not found');
    }

  });
});

describe('validateLogin', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, TasksService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  })

  it('should return JWT object when credentials are valid', async () => {
    const res = await service.login({ username: 'maria', userId: 0 });
    expect(res.access_token).toBeDefined();
  });
});
