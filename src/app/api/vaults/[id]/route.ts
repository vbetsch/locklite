import 'reflect-metadata';
import type { NextResponse } from 'next/server';
import type { IdParam } from '@shared/dto/params/id.param';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/utils/handle-api-request';
import { StatusCodes } from 'http-status-codes';
import { DeleteVaultUseCase } from '@api/usecases/vaults/delete-vault.usecase';

/**
 * @swagger
 * /api/vaults/{id}:
 *   delete:
 *     tags:
 *      - Vaults
 *     description: Delete a vault by id
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id of vault to delete
 *        schema:
 *          type: string
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
