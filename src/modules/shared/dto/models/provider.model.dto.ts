/**
 * @swagger
 * components:
 *   schemas:
 *     ProviderModelDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         signinUrl:
 *           type: string
 *           format: uri
 *         callbackUrl:
 *           type: string
 *           format: uri
 */
export type ProviderModelDto = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};
