import type { UserModelDto } from '@shared/modules/users/user.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDataDto:
 *       type: object
 *       required:
 *        - data
 *       properties:
 *         data:
 *           type: object
 *           required:
 *            - userCreated
 *           properties:
 *             userCreated:
 *               $ref: '#/components/schemas/UserModelDto'
 */
export type RegisterDataDto = {
  userCreated: UserModelDto;
};
