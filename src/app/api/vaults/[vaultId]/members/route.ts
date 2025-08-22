import 'reflect-metadata';
import type { NextRequest, NextResponse } from 'next/server';
import type { HttpOptionsDto } from '@shared/dto/input/http-options.dto';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/app/handle-api-request';
import type { HttpResponseDto } from '@shared/dto/output/http.response.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { EditMembersUseCase } from '@api/modules/vaults/domain/usecases/edit-members.usecase';
import type { ShareVaultParamsDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.params.dto';
import type { ShareVaultDataDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.data.dto';
import type { ShareVaultPayloadDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.payload.dto';

/**
 * @swagger
 * /api/vaults/{vaultId}/members:
 *   put:
 *     tags: [Vaults]
 *     summary: Edit members of a vault by ID
 *     parameters:
 *      - in: path
 *        name: vaultId
 *        required: true
 *        description: ID of vault to edit
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditMembersPayloadDto'
 *     responses:
 *       200:
 *         description: Returns the vault edited
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditMembersDataDto'
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 *       401:
 *         description: Unauthorized
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
export async function PUT(
  request: NextRequest,
  options: HttpOptionsDto<ShareVaultParamsDto>
): Promise<NextResponse<HttpResponseDto<ShareVaultDataDto>>> {
  const payload: ShareVaultPayloadDto = await request.json();
  const editMembersUseCase: EditMembersUseCase =
    container.resolve(EditMembersUseCase);
  return await handleApiRequest<ShareVaultDataDto>({
    request: request,
    needToBeAuthenticated: true,
    callback: async () => {
      const vaultEdited: VaultWithMembersModelDto =
        await editMembersUseCase.handle({
          params: await options.params,
          payload,
        });
      const response: ShareVaultDataDto = {
        vaultEdited,
      };
      return response;
    },
  });
}
