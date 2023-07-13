import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 204, description: 'Created', type: FindUserDto })
  @ApiResponse({
    status: 400,
    description: 'Validation Error',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<FindUserDto> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({
    status: 200,
    description: 'The users founded',
    type: FindUserDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<FindUserDto[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find one user' })
  @ApiOkResponse({
    status: 200,
    description: 'The found record',
    type: FindUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<FindUserDto> {
    return this.usersService.findOneWithoutPassword(id);
  }

  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({status: 200, description: 'Success'})
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
