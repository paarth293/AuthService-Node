prisma.$on('error', (e) => {
  logger.error('Prisma error:', e);
});