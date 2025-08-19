import { NextResponse } from 'next/server';

function sleep(ms: number): Promise<unknown> {
  return new Promise(r => setTimeout(r, ms));
}

export async function GET(): Promise<NextResponse> {
  await sleep(1500);
  return NextResponse.json({ ok: true, delay: 1500 });
}

export const runtime: string = 'nodejs';
