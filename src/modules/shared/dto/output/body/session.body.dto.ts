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
 *             id:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             name:
 *               type: string
 *               nullable: true
 *         expires:
 *           type: string
 *           format: date-time
 */
export type SessionBodyDto = {
  user: {
    id?: string;
    email: string;
    name?: string | null;
  };
  expires: string;
};
