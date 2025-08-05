import type { NextRequest, NextResponse } from 'next/server';
import type { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import type { RegisterDataDto } from '@shared/dto/output/data/register.data.dto';
import type { RegisterPayloadDto } from '@shared/dto/input/payloads/register.payload.dto';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/helpers/api/handle-api-request';
import { StatusCodes } from 'http-status-codes';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPayloadDto'
 *     responses:
 *      201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterDataDto'
 *       400:
 *         description: Bad request (missing email or password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<HttpResponseDto<RegisterDataDto>>> {
  const payload: RegisterPayloadDto = await request.json();
  const registerUseCase: RegisterUseCase = container.resolve(RegisterUseCase);
  return await handleApiRequest<RegisterDataDto>(async () => {
    const userCreated: UserModelDto = await registerUseCase.handle(payload);
    const response: RegisterDataDto = { userCreated };
    return response;
  }, StatusCodes.CREATED);
}
