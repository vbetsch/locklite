import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

const globalForPrisma: { prisma: PrismaClient | undefined } =
  globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };

export const prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  DefaultArgs
> =
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
