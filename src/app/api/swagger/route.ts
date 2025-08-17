import { createSwaggerSpec } from 'next-swagger-doc';
import { NextResponse } from 'next/server';
import { CONSTANTS } from '@shared/config/constants';

export function GET(): NextResponse | null {
  const spec: object = createSwaggerSpec({
    apiFolder: 'src/app/api',
    schemaFolders: ['src/projects/shared/dto'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: `${CONSTANTS.APP_NAME} API`,
        version: '1.0.0',
      },
    },
  });

  return NextResponse.json(spec);
}
