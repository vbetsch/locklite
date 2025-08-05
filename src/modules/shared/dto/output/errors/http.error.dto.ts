import type { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

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
 *             code:
 *               type: string
 */
export type HttpErrorDto = {
  error: {
    message: string;
    code?: BusinessErrorCodeEnum;
  };
};
