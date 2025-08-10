/**
 * @swagger
 * components:
 *   schemas:
 *     SessionBodyDto:
 *       type: object
 *       required:
 *         - user
 *         - expires
 *       properties:
 *         user:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *               description: current user's email
 *               format: email
 *             name:
 *               type: string
 *               description: current user's name
 *               nullable: true
 *         expires:
 *           type: string
 *           format: date-time
 */
export type SessionBodyDto = {
  user: {
    email: string;
    name?: string | null;
  };
  expires: string;
};
