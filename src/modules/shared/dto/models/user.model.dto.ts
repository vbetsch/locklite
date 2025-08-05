/**
 * @swagger
 * components:
 *   schemas:
 *     UserModelDto:
 *       type: object
 *       required:
 *        - id
 *        - email
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 */
export type UserModelDto = {
  id: string;
  email: string;
  name?: string;
};
