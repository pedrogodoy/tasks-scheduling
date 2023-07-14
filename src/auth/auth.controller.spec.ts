import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Task } from '../tasks/entities/task.entity';
import { AuthModule } from './auth.module';

const createUserDto: CreateUserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  username: 'pedro',
  password: 'password',
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  // let usersRepository: Repository<User>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            name: (new Date().getTime() * Math.random()).toString(16),
            database: ':memory:',
            dropSchema: true,
            entities: [User, Task],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([User, Task]),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
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
            login: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlZHJvMTExMSIsImlhdCI6MTY4OTIxMjUzNCwiZXhwIjoxNjg5MjEyNTk0fQ.VIFNUtRF06k2R_K6NqgYWigSigbGfCP9iGggdv6WT88',
              }),
            )
          },
        },
      ],
    }).compile();

    

    authService = app.get<AuthService>(AuthService);
    authController = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login()', () => {
    it('should return a access token', async () => {
      const userLogin = { user: { username: 'pedro1111', password: '123' } };

      authController.login(userLogin);
      expect(authController.login(userLogin)).resolves.toBeDefined();
    });
  });

  describe('profile()', () => {
    it('should return the current user', async () => {
      const userLogin = { user: { username: 'pedro1111', password: '123' } };

      const res = await authController.getProfile(userLogin);
      expect(res.username).toBeDefined();
    });
  });
});
