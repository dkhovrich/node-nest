import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: []
})
export class AppModule {}
