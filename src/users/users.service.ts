import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, User } from './users.types';
import {
  createResultError,
  createResultSuccess,
  Result
} from '../utils/result';

export const USER_SERVICE = Symbol();

export interface IUsersService {
  users: User[];

  getById(id: string): Result<User>;

  getAll(): User[];

  create(userDto: CreateUserDto): void;
}

@Injectable()
export class UsersService implements IUsersService {
  readonly users: User[] = [
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

  getAll(): User[] {
    return this.users;
  }

  create(userDto: CreateUserDto): void {
    const user: User = { ...userDto, id: uuid() };
    this.users.push(user);
  }
}
