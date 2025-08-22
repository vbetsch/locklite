import type { NextRequest, NextResponse } from 'next/server';
import type { HttpOptionsDto } from '@shared/dto/input/http-options.dto';
import type { EditMembersParamsDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.params.dto';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/app/handle-api-request';
import { StatusCodes } from 'http-status-codes';
import type { HttpResponseDto } from '@shared/dto/output/http.response.dto';
import type { EditMembersDataDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.data.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import type { EditMembersPayloadDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.payload.dto';

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
      const vaultCreated: VaultWithMembersModelDto =
        await editMembersUseCase.handle(payload);
      const response: EditMembersDataDto = {
        vaultCreated,
      };
      return response;
    },
    successStatusCode: StatusCodes.CREATED,
  });
}
