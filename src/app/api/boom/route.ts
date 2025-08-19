export const runtime: 'nodejs' | 'edge' | 'experimental-edge' | undefined =
  'nodejs';

export function GET(): never {
  throw new Error('Synthetic boom for Sentry');
}
