import type { BusinessErrorCodeEnumDto } from '@shared/dto/output/errors/business-error-code.enum.dto';

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
    code?: BusinessErrorCodeEnumDto;
  };
};
