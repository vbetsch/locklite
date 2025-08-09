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
 *           description: UUID
 *         email:
 *           type: string
 *           description: user's email
 *           format: email
 *         name:
 *           type: string
 *           description: fist name and last name
 */
export type UserModelDto = {
  id: string;
  email: string;
  name?: string;
};
