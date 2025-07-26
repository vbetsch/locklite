'use client';

import React from 'react';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';

export default function ApiDocs(): JSX.Element {
  useEffect(() => {
    const style: HTMLLinkElement = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css';
    document.head.appendChild(style);

    const script: HTMLScriptElement = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js';
    script.onload = (): void => {
      // @ts-expect-error: SwaggerUIBundle is unknown
      const SwaggerUIBundle: unknown = window.SwaggerUIBundle;
      // @ts-expect-error: SwaggerUIBundle is unknown
      SwaggerUIBundle({
        url: '/api/swagger',
        dom_id: '#swagger-ui',
      });
    };
    document.body.appendChild(script);
  }, []);

  return <Box id="swagger-ui" />;
}
