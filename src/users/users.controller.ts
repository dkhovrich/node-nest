import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UsePipes
} from '@nestjs/common';
import * as Joi from 'joi';
import { UsersService } from './users.service';
import { CreateUserDto, User } from './users.types';
import { JoiValidationPipe } from '../utils/joi-validation.pipe';

const createUserScheme = Joi.object<CreateUserDto>({
  name: Joi.string().min(5).max(100),
  email: Joi.string().email()
});

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): User {
    return this.usersService.getById(id);
  }

  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createUserScheme))
  create(@Body() createUserDto: CreateUserDto): void {
    this.usersService.create(createUserDto);
  }
}
