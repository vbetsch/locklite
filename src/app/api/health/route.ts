import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export async function GET(): Promise<NextResponse> {
  const t0: number = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency: number = Date.now() - t0;
    return NextResponse.json({ ok: true, db: true, latency }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, db: false }, { status: 503 });
  }
}

export const runtime: string = 'nodejs';
