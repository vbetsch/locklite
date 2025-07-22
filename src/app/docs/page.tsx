"use client";

import { useEffect } from "react";

export default function ApiDocs() {
  useEffect(() => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css";
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js";
    script.onload = () => {
      // @ts-ignore
      const SwaggerUIBundle = window.SwaggerUIBundle;
      SwaggerUIBundle({
        url: "/api/docs",
        dom_id: "#swagger-ui",
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="swagger-ui" />;
}
