import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prisma.$on('error', (e) => {
  logger.error('Prisma error:', e);
});

export { prisma };