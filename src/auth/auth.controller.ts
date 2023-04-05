import { Controller, Request, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { AuthRequest } from './auth.interface';
import { Request as RequestExp, Response as ResponseExp } from 'express';
import { Http, HttpCode } from 'src/common.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: RequestExp, @Res() res: ResponseExp) {
    const body = req.body as undefined as AuthRequest;
    if (!body.username || !body.password) {
      // nest js return unautorized
      const data = Http({
        http: HttpCode.CommonError,
        message: 'Need Json Payload Username/Password',
        data: null,
      });
      return res.status(data.statusCode).json(data).send();
    }
    const loginResult = await this.authService.login(body);

    const result = loginResult.success
      ? Http({
          http: HttpCode.Success,
          message: null,
          data: loginResult,
        })
      : Http({
          http: HttpCode.CommonError,
          message: 'Username/Password did not match!',
          data: null,
        });

    return res.status(result.statusCode).json(result).send();
  }
}
