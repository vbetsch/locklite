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
 *           description: email of new user
 *           format: email
 *         password:
 *           type: string
 *           description: plain password of new user
 *           format: password
 *         name:
 *           type: string
 *           description: first name and last name of the new user
 */
export type RegisterPayloadDto = {
  email: string;
  password: string;
  name?: string;
};
