import 'reflect-metadata';
import type { NextRequest, NextResponse } from 'next/server';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/app/helpers/handle-api-request';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { CreateVaultUseCase } from '@api/domain/usecases/vaults/create-vault.usecase';
import { GetMyVaultsUseCase } from '@api/domain/usecases/vaults/get-my-vaults.usecase';
import { StatusCodes } from 'http-status-codes';
import type { CreateVaultDataDto } from '@shared/dto/output/data/create-vault.data.dto';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/get-my-vaults.data.dto';
import type { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import type { CreateVaultPayloadDto } from '@shared/dto/input/payloads/create-vault.payload.dto';

/**
 * @swagger
 * /api/vaults:
 *   get:
 *     tags: [Vaults]
 *     summary: Get my vaults
 *     responses:
 *       200:
 *         description: Returns my vaults
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMyVaultsBodyDto'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<HttpResponseDto<GetMyVaultsDataDto>>> {
  const getMyVaultsUseCase: GetMyVaultsUseCase =
    container.resolve(GetMyVaultsUseCase);
  return await handleApiRequest<GetMyVaultsDataDto>({
    request: request,
    needToBeAuthenticated: true,
    callback: async () => {
      const myVaults: VaultModelDto[] = await getMyVaultsUseCase.handle();
      const response: GetMyVaultsDataDto = { myVaults };
      return response;
    },
  });
}

/**
 * @swagger
 * /api/vaults:
 *   post:
 *     tags: [Vaults]
 *     summary: Create a vault
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVaultPayloadDto'
 *     responses:
 *       201:
 *         description: Returns the vault created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateVaultBodyDto'
 *       409:
 *         description: Vault already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessErrorDto'
 *       422:
 *         description: The vault label must not exceed 255 characters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessErrorDto'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<HttpResponseDto<CreateVaultDataDto>>> {
  const payload: CreateVaultPayloadDto = await request.json();
  const createVaultUseCase: CreateVaultUseCase =
    container.resolve(CreateVaultUseCase);
  return await handleApiRequest<CreateVaultDataDto>({
    request: request,
    needToBeAuthenticated: true,
    callback: async () => {
      const vaultCreated: VaultModelDto =
        await createVaultUseCase.handle(payload);
      const response: CreateVaultDataDto = { vaultCreated };
      return response;
    },
    successStatusCode: StatusCodes.CREATED,
  });
}
