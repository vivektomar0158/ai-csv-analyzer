import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

export function getPrisma() {
  // In this repo, Prisma's datasource URL is configured via `prisma.config.ts` using DATABASE_URL.
  // If it's missing, Prisma can throw during client initialization. Make this failure explicit
  // and (most importantly) avoid crashing module import so API routes can return JSON errors.
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: ['error', 'warn'],
    });
  }

  return globalForPrisma.prisma;
}
