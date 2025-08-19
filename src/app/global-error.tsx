'use client';

import * as Sentry from '@sentry/nextjs';
import type { JSX } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}): JSX.Element {
  Sentry.captureException(error);
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang,no-restricted-syntax,react/react-in-jsx-scope
    <html>
      {/* eslint-disable-next-line no-restricted-syntax,react/react-in-jsx-scope */}
      <body>Something went wrong.</body>
    </html>
  );
}
