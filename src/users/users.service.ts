import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, User } from './users.types';
import {
  createResultError,
  createResultSuccess,
  Result
} from '../utils/result';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 'bd45cc0a-d19d-42da-9f0c-4c73c143b46f',
      name: 'admin',
      password: 'qwerty'
    }
  ];

  getById(id: string): Result<User> {
    const user = this.users.find((u) => u.id === id);
    if (user === undefined) {
      return createResultError(new Error('User not found'));
    }

    return createResultSuccess(user);
  }

  validateUser(name: string, password: string): Result<User> {
    const user = this.users.find(
      (u) => u.name === name && u.password === password
    );

    if (user === undefined) {
      return createResultError(new Error());
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
