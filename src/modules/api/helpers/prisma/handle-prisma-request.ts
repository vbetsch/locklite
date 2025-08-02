import { handlePrismaError } from '@api/helpers/prisma/handle-prisma-errors';
import type { PrismaErrorLike } from '@api/types/prisma-error-like.type';

export async function handlePrismaRequest<T>(
  callback: () => Promise<T>
): Promise<T> {
  try {
    return await callback();
  } catch (error: unknown) {
    // if match with type PrismaErrorLike
    if (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      typeof error.name === 'string'
    ) {
      throw handlePrismaError(error as PrismaErrorLike);
    }
    throw error;
  }
}
