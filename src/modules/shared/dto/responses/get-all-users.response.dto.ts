import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import type { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetAllUsersResponseDto:
 *       type: object
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserModelDto'
 */
export type GetAllUsersResponseDto = HttpResponseDto<{
  users: UserModelDto[];
}>;
