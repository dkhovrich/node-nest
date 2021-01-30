import { Module } from '@nestjs/common';
import { USER_SERVICE, UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USER_SERVICE,
      useFactory: () => {
        return new UsersService();
      }
    }
  ]
})
export class UsersModule {}
