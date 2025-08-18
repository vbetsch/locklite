import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? 'development',
  tracesSampleRate: 0.2,
  tracesSampler: (ctx) => {
    const env = process.env.VERCEL_ENV ?? 'development';
    if (env !== 'production') return 1.0;
    const name = ctx.transactionContext?.name ?? '';
    if (name.includes('/api/auth')) return 1.0;
    if (name.startsWith('GET /api/') || name.startsWith('POST /api/')) return 0.5;
    if (ctx.parentSampled) return 1.0;
    return 0.2;
  },
  beforeSend(event) {
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers.cookie;
      // @ts-ignore
      delete event.request.headers['set-cookie'];
    }
    if (event.user) {
      // @ts-ignore
      delete event.user.email;
    }
    return event;
  }
});
