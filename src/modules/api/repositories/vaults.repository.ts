import { injectable } from 'tsyringe';
import { Vault } from '@prisma/generated';
import prisma from '@lib/prisma';
import type { CreateVaultParamsDto } from '@shared/dto/params/create-vault.params.dto';

@injectable()
export class VaultsRepository {
  public async create(params: CreateVaultParamsDto): Promise<Vault> {
    return await prisma.vault.create({ data: params });
  }
}
