import 'reflect-metadata';
import type { NextRequest, NextResponse } from 'next/server';
import type { HttpOptionsDto } from '@shared/dto/input/http-options.dto';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/app/handle-api-request';
import type { HttpResponseDto } from '@shared/dto/output/http.response.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import type { ShareVaultParamsDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.params.dto';
import type { ShareVaultDataDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.data.dto';
import type { ShareVaultPayloadDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.payload.dto';
import { ShareVaultUseCase } from '@api/modules/vaults/domain/usecases/share-vault.usecase';

/**
 * @swagger
 * /api/vaults/{vaultId}/members:
 *   put:
 *     tags: [Vaults]
 *     summary: Share vault with members
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
 *             $ref: '#/components/schemas/ShareVaultPayloadDto'
 *     responses:
 *       200:
 *         description: Returns the vault edited
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShareVaultDataDto'
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
  const shareVaultUseCase: ShareVaultUseCase =
    container.resolve(ShareVaultUseCase);
  return await handleApiRequest<ShareVaultDataDto>({
    request: request,
    needToBeAuthenticated: true,
    callback: async () => {
      const vaultEdited: VaultWithMembersModelDto =
        await shareVaultUseCase.handle({
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
