import type { NextResponse } from 'next/server';
import type { IdParam } from '@shared/dto/params/id.param';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/utils/handle-api-request';
import { StatusCodes } from 'http-status-codes';

/**
 * @swagger
 * /api/vaults/{id}:
 *   delete:
 *     tags:
 *      - Vaults
 *     description: Delete a vault by id
 *     responses:
 *       204:
 *         description: The vault has been successfully deleted
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpResponseDto'
 */
export async function DELETE(params: IdParam): Promise<NextResponse> {
  const deleteVaultUseCase: DeleteVaultUseCase =
    container.resolve(DeleteVaultUseCase);
  return await handleApiRequest(async () => {
    await deleteVaultUseCase.handle(params);
    return null;
  }, StatusCodes.NO_CONTENT);
}
