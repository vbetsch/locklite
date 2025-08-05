import { PrismaClient } from 'prisma-client-647eccd45afcc1038f1479a390cc06806e4096051cc0b6ca5d4be264374d51df';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
