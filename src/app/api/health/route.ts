import * as Sentry from '@sentry/nextjs';

const checkInId: string = Sentry.captureCheckIn({
  monitorSlug: 'locklite-health',
  status: 'in_progress',
});

Sentry.captureCheckIn({
  checkInId,
  monitorSlug: 'locklite-health',
  status: 'ok',
});

Sentry.captureCheckIn({
  checkInId,
  monitorSlug: 'locklite-health',
  status: 'error',
});
