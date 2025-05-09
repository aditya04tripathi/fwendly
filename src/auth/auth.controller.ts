import { Body, Controller, Post, Headers, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, ForgotPasswordDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post("signin")
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @Post("signup")
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post("forgot-password")
  forgotPassword(@Headers() headers: Record<string, string>, @Body() dto: ForgotPasswordDto) {
    const authHeader = headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    return this.authService.forgotPassword(token, dto.email, dto.newPassword);
  }

  @Delete("delete-account")
  deleteAccount(@Headers() headers: Record<string, string>) {
    const authHeader = headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
      return {
        okay: false,
        msg: 'Authorization token is missing',
      }
    }

    return this.authService.deleteUser(token);
  }
}
