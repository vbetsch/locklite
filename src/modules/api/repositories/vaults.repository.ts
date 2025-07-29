import { injectable } from 'tsyringe';
import { Vault } from '@prisma/generated';
import prisma from '@lib/prisma';
import { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';
import { NoVaultFoundError } from '@api/errors/no-vault-found.error';

@injectable()
export class VaultsRepository {
  public async findAll(): Promise<Vault[]> {
    return await prisma.vault.findMany();
  }

  public async create(params: CreateVaultRequestDto): Promise<Vault> {
    return await prisma.vault.create({ data: params });
  }

  public async delete(id: string): Promise<void> {
    try {
      await prisma.vault.delete({ where: { id: id } });
    } catch (error: unknown) {
      console.error(error);
      throw new NoVaultFoundError();
    }
  }
}
