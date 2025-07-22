import {GetAllUsersUseCase} from "@api/usecases/users/get-all-users.usecase";
import {handleApiRequest} from "@api/utils/handle-api-request";
import {GetAllUsersResponseDto} from "@shared/dto/responses/get-all-users.response.dto";
import {UserModelDto} from "@shared/dto/models/user.model.dto";

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllUsersResponse'
 */

export async function GET() {
    return handleApiRequest(async () => {
        const users: UserModelDto[] = await GetAllUsersUseCase.handle()
        const response: GetAllUsersResponseDto = {users}
        return response
    })
}
