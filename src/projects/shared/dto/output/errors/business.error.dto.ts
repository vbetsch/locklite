import type { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessErrorDto:
 *       type: object
 *       required:
 *        - error
 *       properties:
 *         error:
 *           type: object
 *           required:
 *            - message
 *            - code
 *           properties:
 *             message:
 *               type: string
 *             code:
 *               type: string
 */
export type BusinessErrorDto = {
  error: {
    message: string;
    code: BusinessErrorCodeEnum;
  };
};
