import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'supersecretkey';
  }

  sign(payload: Record<string, any>, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.secret, options);
  }
  verifyAndDecode(
    token: string,
    options?: jwt.VerifyOptions,
  ): Record<string, any> {
    try {
      // @ts-expect-error JWT.verify is not a function
      return jwt.verify(token, this.secret, options);
    } catch (error) {
      throw new HttpException(
        'The token provided is invalid or expired.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
