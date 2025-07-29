import type { NextRequest } from 'next/server';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/utils/handle-api-request';

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
