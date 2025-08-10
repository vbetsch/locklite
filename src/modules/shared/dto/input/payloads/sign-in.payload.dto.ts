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
 *           description: email of user to sign
 *           format: email
 *         password:
 *           type: string
 *           description: plain password of user to sign
 *           format: password
 */
export type SignInPayloadDto = {
  email: string;
  password: string;
};
