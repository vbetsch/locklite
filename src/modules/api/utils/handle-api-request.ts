import { HttpError } from '@api/errors/http-error';
import { StatusCodes } from 'http-status-codes';

export async function handleApiRequest<T>(
  callback: () => Promise<T>
): Promise<Response> {
  try {
    const data: Awaited<T> = await callback();
    return Response.json(data, { status: StatusCodes.OK });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error(error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
