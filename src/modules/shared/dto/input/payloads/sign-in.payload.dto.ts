/**
 * @swagger
 * components:
 *   schemas:
 *     SignInPayloadDto:
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
 */
export type SignInPayloadDto = {
  email: string;
  password: string;
};
