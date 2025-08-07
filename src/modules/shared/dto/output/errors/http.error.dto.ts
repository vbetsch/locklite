/**
 * @swagger
 * components:
 *   schemas:
 *     HttpErrorDto:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
export type HttpErrorDto = {
  error: {
    message: string;
  };
};
