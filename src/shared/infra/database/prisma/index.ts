import { PrismaClient } from '@prisma/client';
import { logger } from '@shared/infra/providers/logger/implementations/LoggerProvider';

export const prismaClient = new PrismaClient();

export async function connectToPostgresSQL(): Promise<void> {
  await prismaClient.$connect();

  logger.info('Postgres database is connected');
}

export async function disconnectFromPostgresSQL(): Promise<void> {
  await prismaClient.$disconnect();

  logger.warn('Postgres database disconnected');
}
