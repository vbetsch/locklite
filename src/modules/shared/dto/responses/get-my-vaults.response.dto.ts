import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';

export type GetMyVaultsResponseDto = HttpResponseDto<{
  myVaults: VaultModelDto[];
}>;
