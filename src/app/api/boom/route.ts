export function GET(): never {
  throw new Error('Synthetic boom for Sentry');
}

export const runtime: string = 'nodejs';
