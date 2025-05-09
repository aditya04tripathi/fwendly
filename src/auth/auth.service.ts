import { Header, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async signin(dto: SignInDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        monash_email: email,
      }
    });

    if (!user) {
      return {
        okay: false,
        msg: 'User not found',
      }
    }

    const passwordMatches = await argon.verify(user.password_hash, password);
    if (!passwordMatches) {
      return {
        okay: false,
        msg: 'Invalid password',
      }
    }

    const token = jwt.sign(user, "supersecretkey", {
      expiresIn: '1h',
    });

    return { ...user, password_hash: undefined, token };
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
    return user;
  }

  async forgotPassword(token: string, email: string, newPassword: string) {
    console.log(`Token: ${token}`);

    const user = await this.prisma.user.findUnique({
      where: {
        monash_email: email,
      }
    });

    if (!user) {
      return {
        okay: false,
        msg: 'User not found',
      }
    }

    const isValidToken = await jwt.verify(token, "supersecretkey");
    if (!isValidToken) {
      return {
        okay: false,
        msg: 'Invalid token',
      }
    }

    const hash = await argon.hash(newPassword);
    await this.prisma.user.update({
      where: {
        monash_email: email,
      },
      data: {
        password_hash: hash,
      },
    });

    return { okay: true, msg: 'Password updated successfully' };
  }

  async deleteUser(token: string) {
    const isValidToken = jwt.verify(token, "supersecretkey");
    if (!isValidToken) {
      return {
        okay: false,
        msg: 'Invalid token',
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        // @ts-expect-error monash_email is not a property of the token
        // but it is a property of the user
        monash_email: isValidToken.monash_email,
      }
    });

    if (!user) {
      return {
        okay: false,
        msg: 'User not found',
      }
    }

    await this.prisma.user.delete({
      where: {
        // @ts-expect-error monash_email is not a property of the token
        // but it is a property of the user
        monash_email: isValidToken.monash_email,
      }
    });

    return { okay: true, msg: 'User deleted successfully' };
  }
}
