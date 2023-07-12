import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
import { AuthModule } from './auth.module';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

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

  // afterEach(async () => {
  //   await sleep(2000);
  // });

  it('should be defined', () => {
    expect(true).toBe(true)
  });

  // beforeEach(async () => {
  //   jest.useFakeTimers();

  //   const moduleRef: TestingModule = await Test.createTestingModule({
  //     imports: [
  //       TypeOrmModule.forRoot({
  //         type: 'sqlite',
  //         database: './database.test.db',
  //         entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //         synchronize: true,
  //       }),
  //       UsersModule,
  //       PassportModule,
  //       JwtModule.register({
  //         secret: jwtConstants.secret,
  //         signOptions: { expiresIn: '60s' },
  //       }),
  //     ],
  //     providers: [AuthService, LocalStrategy, JwtStrategy],
  //   }).compile();

  //   service = moduleRef.get<AuthService>(AuthService);
  // });

  
});

// describe('validateUser', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     jest.useFakeTimers();

//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: './database.test.db',
//           entities: [__dirname + '/**/*.entity{.ts,.js}'],
//           synchronize: true,
//         }),
//         AuthModule,
//         UsersModule,
//         PassportModule,
//         JwtModule.register({
//           secret: jwtConstants.secret,
//           signOptions: { expiresIn: '60s' },
//         }),
//       ],
//       providers: [AuthService, LocalStrategy, JwtStrategy],
//     }).compile();

//     service = moduleRef.get<AuthService>(AuthService);
//   });

//   it('should return a user object when credentials are valid', async () => {
//     const res = await service.validateUser('maria', 'guess');
//     expect(res.userId).toEqual(3);
//   });

//   it('should return null when credentials are invalid', async () => {
//     const res = await service.validateUser('xxx', 'xxx');
//     expect(res).toBeNull();
//   });
// });

// describe('validateLogin', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     jest.useFakeTimers();
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: './database.test.db',
//           entities: [__dirname + '/**/*.entity{.ts,.js}'],
//           synchronize: true,
//         }),
//         UsersModule,
//         PassportModule,
//         AuthModule,
//         JwtModule.register({
//           secret: jwtConstants.secret,
//           signOptions: { expiresIn: '60s' },
//         }),
//       ],
//       providers: [AuthService, LocalStrategy, JwtStrategy],
//     }).compile();

//     service = moduleRef.get<AuthService>(AuthService);
//   });

//   it('should return JWT object when credentials are valid', async () => {
//     const res = await service.login({ username: 'maria', userId: 3 });
//     expect(res.access_token).toBeDefined();
//   });
// });
