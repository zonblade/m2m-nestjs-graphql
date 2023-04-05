import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { AuthRequest } from './auth.interface';
import { UserAggregate } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: AuthRequest) {
    const result: UserAggregate | null = await this.usersService.getUser(
      user.username,
      user.password,
    );
    let access_token: string | null = null;
    let success = false;
    if (result) {
      access_token = this.jwtService.sign({
        username: result.username,
        sub: result._id,
      });
      success = true;
    }
    return {
      access_token,
      success,
    };
  }
}
