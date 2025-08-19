import * as Sentry from '@sentry/nextjs';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function register(): Promise<void> {}

// eslint-disable-next-line @typescript-eslint/typedef
export const onRequestError = Sentry.captureRequestError;
