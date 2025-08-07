/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterPayloadDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         name:
 *           type: string
 */
export type RegisterPayloadDto = {
  email: string;
  password: string;
  name?: string;
};
