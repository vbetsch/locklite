import 'reflect-metadata';
import type { NextRequest, NextResponse } from 'next/server';
import type { HttpOptionsDto } from '@shared/dto/input/http-options.dto';
import type { EditMembersParamsDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.params.dto';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/app/handle-api-request';
import type { HttpResponseDto } from '@shared/dto/output/http.response.dto';
import type { EditMembersDataDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.data.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import type { EditMembersPayloadDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.payload.dto';
import { EditMembersUseCase } from '@api/modules/vaults/domain/usecases/edit-members.usecase';

/**
 * @swagger
 * /api/vaults/{id}/members:
 *   put:
 *     tags: [Vaults]
 *     summary: Edit members of a vault by ID
 *     parameters:
 *      - in: path
 *        name: id
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
  options: HttpOptionsDto<EditMembersParamsDto>
): Promise<NextResponse<HttpResponseDto<EditMembersDataDto>>> {
  const payload: EditMembersPayloadDto = await request.json();
  const editMembersUseCase: EditMembersUseCase =
    container.resolve(EditMembersUseCase);
  return await handleApiRequest<void>({
    request: request,
    needToBeAuthenticated: true,
    callback: async () => {
      const vaultUpdated: VaultWithMembersModelDto =
        await editMembersUseCase.handle({
          params: await options.params,
          payload,
        });
      const response: EditMembersDataDto = {
        vaultUpdated,
      };
      return response;
    },
  });
}
