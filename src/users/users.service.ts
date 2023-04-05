import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAggregate } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    return this.userModel.create({
      username,
      password,
    });
  }

  async getUser(
    username: string,
    password: string,
  ): Promise<UserAggregate | null> {
    const result: UserAggregate[] = await this.userModel.aggregate([
      {
        $match: {
          username: username,
          password: password,
        },
      },
      {
        $project: {
          _id: { $toString: '$_id' },
          username: '$username',
        },
      },
    ]);
    if (result.length == 0) {
      return null;
    }
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }
}
