/**
 * @swagger
 * components:
 *   schemas:
 *     UserModelDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
export type UserModelDto = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};
