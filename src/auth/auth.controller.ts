import {
  Body,
  Controller,
  Post,
  Headers,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, ForgotPasswordDto } from './dto';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Patch('forgot-password')
  forgotPassword(
    @Headers() headers: Record<string, string>,
    @Body() dto: ForgotPasswordDto,
  ) {
    const authHeader = headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    try {
      if (!token) {
        throw new HttpException(
          'Authorization token is missing',
          HttpStatus.UNAUTHORIZED,
        );
      }

      jwt.verify(token, 'supersecretkey');
    } catch (error) {
      throw new HttpException(
        'The token provided is invalid or expired.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.authService.forgotPassword(dto);
  }

  @Delete('delete-account')
  deleteAccount(@Headers() headers: Record<string, string>) {
    const authHeader = headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    try {
      if (!token) {
        throw new HttpException(
          'Authorization token is missing',
          HttpStatus.UNAUTHORIZED,
        );
      }

      jwt.verify(token, 'supersecretkey');
    } catch (error) {
      throw new HttpException(
        'The token provided is invalid or expired.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.authService.deleteUser(token);
  }
}
