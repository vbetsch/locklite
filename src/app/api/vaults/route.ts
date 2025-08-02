import 'reflect-metadata';
import type { NextRequest, NextResponse } from 'next/server';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/helpers/handle-api-request';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { CreateVaultResponseDto } from '@shared/dto/responses/create-vault.response.dto';
import { CreateVaultUseCase } from '@api/usecases/vaults/create-vault.usecase';
import type { GetMyVaultsResponseDto } from '@shared/dto/responses/get-my-vaults.response.dto';
import { GetMyVaultsUseCase } from '@api/usecases/vaults/get-my-vaults.usecase';
import type { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';
import { StatusCodes } from 'http-status-codes';

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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpResponseDto'
 */
export async function GET(): Promise<NextResponse> {
  const getMyVaultsUseCase: GetMyVaultsUseCase =
    container.resolve(GetMyVaultsUseCase);
  return await handleApiRequest<GetMyVaultsResponseDto>(async () => {
    const myVaults: VaultModelDto[] = await getMyVaultsUseCase.handle();
    const response: GetMyVaultsResponseDto = { data: { myVaults } };
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
 *             $ref: '#/components/schemas/CreateVaultRequestDto'
 *     responses:
 *       201:
 *         description: Returns the vault created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateVaultResponseDto'
 *       400:
 *         description: One of the requested values is too long
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpResponseDto'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpResponseDto'
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const params: CreateVaultRequestDto = await request.json();
  const createVaultUseCase: CreateVaultUseCase =
    container.resolve(CreateVaultUseCase);
  return await handleApiRequest<CreateVaultResponseDto>(async () => {
    const vaultCreated: VaultModelDto = await createVaultUseCase.handle(params);
    const response: CreateVaultResponseDto = { data: { vaultCreated } };
    return response;
  }, StatusCodes.CREATED);
}
