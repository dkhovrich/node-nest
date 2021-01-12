import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, User } from './users.types';
import {
  createResultError,
  createResultSuccess,
  Result
} from '../utils/result';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getById(id: string): Result<User> {
    const user = this.users.find((u) => u.id === id);
    if (user === undefined) {
      return createResultError(new NotFoundException('User not found'));
    }

    return createResultSuccess(user);
  }

  getAll(): User[] {
    return this.users;
  }

  create(userDto: CreateUserDto): void {
    const user: User = { ...userDto, id: uuid() };
    this.users.push(user);
  }
}
