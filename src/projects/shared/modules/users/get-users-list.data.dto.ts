import type { UserModelDto } from '@shared/modules/users/user.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetUsersListDataDto:
 *       type: object
 *       required:
 *        - data
 *       properties:
 *         data:
 *           type: object
 *           required:
 *            - allUsers
 *           properties:
 *             allUsers:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserModelDto'
 */
export type GetUsersListDataDto = {
  allUsers: UserModelDto[];
};
