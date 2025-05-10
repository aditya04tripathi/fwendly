import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForgotPasswordDto, SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from 'src/jwt/jwt.service';

import { units } from './units/index';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signin(dto: SignInDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        monash_email: email,
      },
    });

    if (!user) {
      throw new HttpException(
        `The user with ${dto.email} was not found. Please sign up.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordMatches = await argon.verify(user.password_hash, password);
    if (!passwordMatches) {
      throw new HttpException(
        'The password entered seems to be invalid. Please try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.jwt.sign(user, {
      expiresIn: '1h',
    });

    return { message: { ...user, token } };
  }

  async signup(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);
    const username = dto.monashEmail.split('@')[0];

    const user = await this.prisma.user.create({
      data: {
        user_id: dto.studentId,
        monash_email: dto.monashEmail,
        password_hash: hash,
        username: username,
        first_name: dto.firstName,
        last_name: dto.lastName,
        year_of_study: dto.yearOfStudy,
      },
    });

    return {
      message:
        'A new user has been created successfully. Enjoy your time on Fwendly!',
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        monash_email: dto.email,
      },
    });

    if (!user) {
      throw new HttpException(
        `The user with ${dto.email} was not found. Please sign up.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const hash = await argon.hash(dto.newPassword);
    await this.prisma.user.update({
      where: {
        monash_email: dto.email,
      },
      data: {
        password_hash: hash,
      },
    });

    return {
      message: 'Password updated successfully',
    };
  }

  async deleteUser(token: string) {
    const isValidToken = this.jwt.verifyAndDecode(token);
    if (!isValidToken) {
      throw new HttpException(
        'You are not authorized to perform this action.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        monash_email: isValidToken.monash_email,
      },
    });

    if (!user) {
      throw new HttpException(
        `The user with ${isValidToken.monash_email} was not found. Please sign up.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.user.delete({
      where: {
        monash_email: isValidToken.monash_email,
      },
    });

    return { message: 'User deleted successfully' };
  }
}
