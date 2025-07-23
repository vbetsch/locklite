import { createSwaggerSpec } from 'next-swagger-doc';

export function GET(): Response {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    schemaFolders: ['src/modules/shared/dto'],
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
