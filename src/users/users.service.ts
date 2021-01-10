import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, User } from './users.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getById(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  getAll(): User[] {
    return this.users;
  }

  create(userDto: CreateUserDto): void {
    const user: User = { ...userDto, id: uuid() };
    this.users.push(user);
  }
}
