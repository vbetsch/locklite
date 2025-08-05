/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDataDto:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               format: uuid
 *             userEmail:
 *               type: string
 *               format: email
 */
export type RegisterDataDto = {
  userId: string;
  userEmail: string;
};
