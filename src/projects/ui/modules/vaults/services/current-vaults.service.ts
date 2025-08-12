import { injectable } from 'tsyringe';
import { VaultModelDto } from '@shared/dto/models/vault.model.dto';

@injectable()
export class CurrentVaultsService {
  private _currentVaults: VaultModelDto[] = [];

  public get currentVaults(): VaultModelDto[] {
    return this._currentVaults;
  }

  public set currentVaults(value: VaultModelDto[]) {
    this._currentVaults = [...value];
  }
}
