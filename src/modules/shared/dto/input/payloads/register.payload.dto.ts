/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterPayloadDto:
 *       type: object
 *       properties:
 *         userEmail:
 *           type: string
 *           format: email
 *         userPassword:
 *           type: string
 *           format: password
 */
export type RegisterPayloadDto = {
  userEmail: string;
  userPassword: string;
};
