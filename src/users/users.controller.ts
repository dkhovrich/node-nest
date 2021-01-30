import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UsePipes,
  NotFoundException,
  Inject
} from '@nestjs/common';
import * as Joi from 'joi';
import { IUsersService, USER_SERVICE } from './users.service';
import { CreateUserDto, User } from './users.types';
import { JoiValidationPipe } from '../utils/joi-validation.pipe';
import { isResultError } from '../utils/result';

const createUserScheme = Joi.object<CreateUserDto>({
  name: Joi.string().min(5).max(100),
  password: Joi.string().min(5).max(100)
});

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: IUsersService
  ) {}

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): User {
    const result = this.usersService.getById(id);
    if (isResultError(result)) {
      throw new NotFoundException(result.error.message);
    }

    return result.value;
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
