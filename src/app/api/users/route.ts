import { GetAllUsersUseCase } from '@api/usecases/users/get-all-users.usecase';
import { handleApiRequest } from '@api/utils/handle-api-request';
import { GetAllUsersResponseDto } from '@shared/dto/responses/get-all-users.response.dto';
import { UserModelDto } from '@shared/dto/models/user.model.dto';

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *      - Users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllUsersResponseDto'
 *       404:
 *         description: Returns a not found error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpResponseDto'
 *             example:
 *               error: Users not found
 */
export async function GET(): Promise<Response> {
  return await handleApiRequest(async () => {
    const users: UserModelDto[] = await GetAllUsersUseCase.handle();
    const response: GetAllUsersResponseDto = { users };
    return response;
  });
}
