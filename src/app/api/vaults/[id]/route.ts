import 'reflect-metadata';
import type { NextRequest, NextResponse } from 'next/server';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/helpers/api/handle-api-request';
import { StatusCodes } from 'http-status-codes';
import { DeleteVaultUseCase } from '@api/usecases/vaults/delete-vault.usecase';
import type { CreateVaultParams } from '@shared/dto/input/params/create-vault.params';
import type { HttpOptions } from '@shared/dto/input/options/abstract/http-options';

/**
 * @swagger
 * /api/vaults/{id}:
 *   delete:
 *     tags:
 *      - Vaults
 *     description: Delete a vault by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of vault to delete
 *        schema:
 *          type: string
 *     responses:
 *       204:
 *         description: The vault has been successfully deleted
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 */
export async function DELETE(
  request: NextRequest,
  options: HttpOptions<CreateVaultParams>
): Promise<NextResponse> {
  const deleteVaultUseCase: DeleteVaultUseCase =
    container.resolve(DeleteVaultUseCase);
  return await handleApiRequest<void>(
    async () => deleteVaultUseCase.handle(await options.params),
    StatusCodes.NO_CONTENT
  );
}
