import type { UserModelDto } from '@shared/dto/models/user.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDataDto:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             userCreated:
 *               $ref: '#/components/schemas/UserModelDto'
 */
export type RegisterDataDto = {
  userCreated: UserModelDto;
};
