import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from 'generated/prisma';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';
import { UsersService } from './user.service';
import { ForgotPasswordDto } from './dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { message: user };
  }

  @UseGuards(JwtGuard)
  @Delete('delete')
  delete(@GetUser() user: User) {
    return this.userService.deleteUser(user);
  }

  @UseGuards(JwtGuard)
  @Patch('forgot-password')
  forgotPassword(@GetUser() user: User, @Body() dto: ForgotPasswordDto) {
    return this.userService.forgotPassword(user, dto);
  }
}
