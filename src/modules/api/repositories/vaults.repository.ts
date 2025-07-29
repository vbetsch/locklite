import { injectable } from 'tsyringe';
import { Vault } from '@prisma/generated';
import prisma from '@lib/prisma';
import { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';

@injectable()
export class VaultsRepository {
  public async findAll(): Promise<Vault[]> {
    return await prisma.vault.findMany();
  }

  public async create(params: CreateVaultRequestDto): Promise<Vault> {
    return await prisma.vault.create({ data: params });
  }

  public async delete(id: string): Promise<void> {
    await prisma.vault.delete({ where: { id: id } });
  }
}
