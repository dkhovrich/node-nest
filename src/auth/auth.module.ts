import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [LocalStrategy]
})
export class AuthModule {}
