import { inject, injectable } from 'tsyringe';
import { GetMyVaultsResponseDto } from '@shared/dto/responses/get-my-vaults.response.dto';
import { LockliteApiRequestService } from '@ui/services/locklite-api-request.service';

@injectable()
export class VaultsGateway {
  public constructor(
    @inject(LockliteApiRequestService)
    private readonly _lockliteRequestService: LockliteApiRequestService
  ) {}

  public async getMyVaults(): Promise<GetMyVaultsResponseDto> {
    return await this._lockliteRequestService.get<GetMyVaultsResponseDto>(
      '/vaults'
    );
  }
}
