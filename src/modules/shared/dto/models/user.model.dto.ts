/**
 * @swagger
 * components:
 *   schemas:
 *     UserModelDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: Date
 */
export type UserModelDto = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};
