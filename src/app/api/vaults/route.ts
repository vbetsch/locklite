import 'reflect-metadata';
import type { NextRequest } from 'next/server';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/utils/handle-api-request';
import type { CreateVaultParamsDto } from '@shared/dto/params/create-vault.params.dto';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { CreateVaultResponseDto } from '@shared/dto/responses/create-vault.response.dto';
import { CreateVaultUseCase } from '@api/usecases/vaults/create-vault.usecase';

/**
 * @swagger
 * /api/vaults:
 *   get:
 *     tags:
 *      - Vaults
 *     description: Get my vaults
 *     responses:
 *       200:
 *         description: Returns my vaults
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMyVaultsResponseDto'
 */
export async function GET(): Promise<Response> {
  const getMyVaultsUseCase: GetMyVaultsUseCase =
    container.resolve(GetMyVaultsUseCase);
  return await handleApiRequest(async () => {
    const myVaults: VaultModelDto[] = await getMyVaultsUseCase.handle();
    const response: GetMyVaultsResponseDto = { myVaults };
    return response;
  });
}

/**
 * @swagger
 * /api/vaults:
 *   post:
 *     tags:
 *      - Vaults
 *     description: Create a vault
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVaultParamsDto'
 *     responses:
 *       200:
 *         description: Returns the vault created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateVaultResponseDto'
 */
export async function POST(request: NextRequest): Promise<Response> {
  const params: CreateVaultParamsDto = await request.json();
  const createVaultUseCase: CreateVaultUseCase =
    container.resolve(CreateVaultUseCase);
  return await handleApiRequest(async () => {
    const vaultCreated: VaultModelDto = await createVaultUseCase.handle(params);
    const response: CreateVaultResponseDto = { vaultCreated };
    return response;
  });
}
