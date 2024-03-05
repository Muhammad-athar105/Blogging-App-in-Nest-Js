import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name)

  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL'),
        }
      }
    })
    this.$connect()
      .then(() => {
        this.logger.debug('Database Connected Successfully!')
      })
      .catch((error) => {
        this.logger.error(
          `Error connnectinig to database: ${error.message}`,
        );
      });
  }
  async onModuleDestory() {
    await this.$disconnect();
    console.log("Disconnected from DB");
  }
}
