import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
});

export const onRouterTransitionStart: (
  href: string,
  navigationType: string
) => void = Sentry.captureRouterTransitionStart;
// eslint-disable-next-line @typescript-eslint/typedef
export const onRequestError = Sentry.captureRequestError;
