import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/typedef
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// eslint-disable-next-line @typescript-eslint/typedef
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
