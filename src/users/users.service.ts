import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAggregate, UserRegister } from './users.interface';
import { ObjectId } from 'bson';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/lib/jwt.sign';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(input: UserRegister): Promise<string | null> {
    const newOid = new ObjectId();
    const result = await this.userModel.insertMany([
      {
        _id: newOid,
        ...input,
      },
    ]);
    if (result.length > 0) {
      const payload: JwtPayload = {
        sub: newOid.toHexString(),
        username: result[0].username,
      };
      return this.jwtService.sign(payload);
    } else {
      return null;
    }
  }

  async getUser(username: string, password: string): Promise<string | null> {
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
    if (result.length > 0) {
      const payload: JwtPayload = {
        sub: result[0]._id,
        username: result[0].username,
      };
      return this.jwtService.sign(payload);
    } else {
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }
}
