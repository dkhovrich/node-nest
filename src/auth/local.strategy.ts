import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.types';
import { isResultError } from '../utils/result';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super();
  }

  validate(username: string, password: string): User {
    const result = this.userService.validateUser(username, password);
    if (isResultError(result)) {
      throw new UnauthorizedException();
    }

    return result.value;
  }
}
