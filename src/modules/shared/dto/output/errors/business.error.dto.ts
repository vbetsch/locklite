import type { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessErrorDto:
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
export type BusinessErrorDto = {
  error: {
    message: string;
    code: BusinessErrorCodeEnum;
  };
};
