'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import type { JSX } from 'react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}): JSX.Element {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang,no-restricted-syntax,react/react-in-jsx-scope
    <html>
      {/* eslint-disable-next-line no-restricted-syntax,react/react-in-jsx-scope */}
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
