import { NextResponse } from 'next/server';

export const runtime: 'nodejs' | 'edge' | 'experimental-edge' | undefined =
  'nodejs';

function sleep(ms: number): Promise<unknown> {
  return new Promise(r => setTimeout(r, ms));
}

export async function GET(): Promise<NextResponse> {
  await sleep(1500);
  return NextResponse.json({ ok: true, delay: 1500 });
}
