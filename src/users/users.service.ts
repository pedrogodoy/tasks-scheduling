import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.username = createUserDto.username;
    user.password = hash;

    const userAlreadyExists = await this.usersRepository.findOne({ where: { username: user.username } });
    if (userAlreadyExists) {
      throw new ConflictException('User already exists!');
    }

    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      isActive: savedUser.isActive,
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        firstName: true,
        username: true,
        lastName: true,
        isActive: true,
      },
    });
  }

  findOneWithoutPassword(id: string): Promise<User> {
    return this.usersRepository.findOne({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isActive: true,
    },
      where: { id: id },
    })
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByLogin(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.findOneBy({ username })
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
