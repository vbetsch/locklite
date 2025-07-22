export async function GET() {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <title>API Docs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function() {
        SwaggerUIBundle({ url: '/api/swagger', dom_id: '#swagger-ui' });
      };
    </script>
  </body>
</html>`
  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}
