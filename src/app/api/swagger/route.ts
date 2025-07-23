import { createSwaggerSpec } from 'next-swagger-doc';

export function GET(): Response {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Locklite API',
        version: '1.0.0',
      },
    },
  });

  return Response.json(spec);
}
