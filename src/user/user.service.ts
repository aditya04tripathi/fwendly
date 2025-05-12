import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { ForgotPasswordDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async forgotPassword(user: User, dto: ForgotPasswordDto) {
    const hash = await argon.hash(dto.password);
    await this.prisma.user.update({
      where: {
        monash_email: user.monash_email,
      },
      data: {
        password_hash: hash,
      },
    });

    return {
      message: 'Password updated successfully',
    };
  }

  async deleteUser(user: User) {
    await this.prisma.user.delete({
      where: {
        monash_email: user.monash_email,
      },
    });

    return { message: 'User deleted successfully' };
  }
}
