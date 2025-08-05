import type { UserModelDto } from '@shared/dto/models/user.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     SignInDataDto:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             userLogged:
 *               $ref: '#/components/schemas/UserModelDto'
 */
export type SignInDataDto = {
  userLogged: UserModelDto;
};
