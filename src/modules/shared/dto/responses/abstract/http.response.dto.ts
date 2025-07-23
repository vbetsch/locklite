/**
 * @swagger
 * components:
 *   schemas:
 *     HttpResponseDto:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */
export type HttpResponseDto<T> = { error?: string } & T;
