import type { UserModelDto } from '@shared/modules/users/user.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     SignInDataDto:
 *       type: object
 *       required:
 *        - data
 *       properties:
 *         data:
 *           type: object
 *           required:
 *            - userLogged
 *           properties:
 *             userLogged:
 *               $ref: '#/components/schemas/UserModelDto'
 */
export type SignInDataDto = {
  userLogged: UserModelDto;
};
