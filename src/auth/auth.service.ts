import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
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

    const passwordMatches = await argon.verify(user.password_hash!, password);
    if (!passwordMatches) {
      throw new HttpException(
        'The password entered seems to be invalid. Please try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.signToken(user.user_id, user.monash_email);

    return token;
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

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    return {
      access_token: await this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_SECRET')!,
        // expiresIn: '1h',
      }),
    };
  }
}
