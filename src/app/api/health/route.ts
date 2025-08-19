import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

const prisma: PrismaClient = new PrismaClient();

export async function GET(): Promise<NextResponse> {
  const checkInId: string = Sentry.captureCheckIn({
    monitorSlug: 'locklite-health',
    status: 'in_progress',
  });

  const t0: number = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency: number = Date.now() - t0;

    Sentry.captureCheckIn({
      checkInId,
      monitorSlug: 'locklite-health',
      status: 'ok',
    });

    return NextResponse.json({ ok: true, db: true, latency }, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);

    Sentry.captureCheckIn({
      checkInId,
      monitorSlug: 'locklite-health',
      status: 'error',
    });

    return NextResponse.json({ ok: false, db: false }, { status: 503 });
  }
}

export const runtime: 'nodejs' | 'edge' | 'experimental-edge' | undefined =
  'nodejs';
