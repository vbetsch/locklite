/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterPayloadDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */
export type RegisterPayloadDto = {
  email: string;
  password: string;
};
