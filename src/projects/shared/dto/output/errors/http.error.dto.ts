/**
 * @swagger
 * components:
 *   schemas:
 *     HttpErrorDto:
 *       type: object
 *       required:
 *        - error
 *       properties:
 *         error:
 *           type: object
 *           required:
 *            - message
 *           properties:
 *             message:
 *               type: string
 */
export type HttpErrorDto = {
  error: {
    message: string;
  };
};
