import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
