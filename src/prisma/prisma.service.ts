import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "postgresql://aditya:toor@localhost:5432/dev_db?schema=public",
        }
      }
    });
  }
}
