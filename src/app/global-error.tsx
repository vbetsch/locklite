'use client';

import React from 'react';
import * as Sentry from '@sentry/nextjs';
import type { JSX } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}): JSX.Element {
  Sentry.captureException(error);
  return (
    // eslint-disable-next-line no-restricted-syntax
    <html lang="en">
      {/* eslint-disable-next-line no-restricted-syntax */}
      <body>Something went wrong.</body>
    </html>
  );
}
