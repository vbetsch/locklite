import 'reflect-metadata';
import type { NextRequest, NextResponse } from 'next/server';
import { container } from 'tsyringe';
import { handleApiRequest } from '@api/app/handle-api-request';
import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import type { HttpResponseDto } from '@shared/dto/output/http.response.dto';
import type { GetUsersListDataDto } from '@shared/modules/users/get-users-list.data.dto';
import { GetUsersListUseCase } from '@api/modules/users/domain/get-users-list.usecase';

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUsersListDataDto'
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
): Promise<NextResponse<HttpResponseDto<GetUsersListDataDto>>> {
  const getUsersListUseCase: GetUsersListUseCase =
    container.resolve(GetUsersListUseCase);
  return await handleApiRequest<GetUsersListDataDto>({
    request: request,
    needToBeAuthenticated: true,
    callback: async () => {
      const allUsers: UserModelDto[] = await getUsersListUseCase.handle();
      const response: GetUsersListDataDto = { allUsers };
      return response;
    },
  });
}
