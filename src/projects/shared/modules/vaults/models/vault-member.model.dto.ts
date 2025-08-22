import type { UserModelDto } from '@shared/modules/users/user.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     VaultMemberModelDto:
 *       type: object
 *       required:
 *        - email
 *       properties:
 *         email:
 *           type: string
 *           description: user's email
 *           format: email
 *         name:
 *           type: string
 *           description: first name and last name
 */
export type VaultMemberModelDto = Omit<UserModelDto, 'id'>;
