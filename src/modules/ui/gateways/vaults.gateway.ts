import { inject, injectable } from 'tsyringe';
import { RequestService } from '@shared/services/request.service';
import { GetMyVaultsResponseDto } from '@shared/dto/responses/get-my-vaults.response.dto';

@injectable()
export class VaultsGateway {
  public constructor(
    @inject(RequestService) private readonly _requestService: RequestService
  ) {}

  public async getMyVaults(): Promise<GetMyVaultsResponseDto> {
    return await this._requestService.get<GetMyVaultsResponseDto>('/vaults');
  }
}
