'use client';

import type { JSX } from 'react';
import { useEffect } from 'react';

export default function ApiDocs(): JSX.Element {
  useEffect(() => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css';
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js';
    script.onload = (): void => {
      // @ts-expect-error: SwaggerUIBundle is unknown
      const SwaggerUIBundle = window.SwaggerUIBundle;
      SwaggerUIBundle({
        url: '/api/swagger',
        dom_id: '#swagger-ui',
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="swagger-ui" />;
}
