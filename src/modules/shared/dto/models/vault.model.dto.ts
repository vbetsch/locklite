/**
 * @swagger
 * components:
 *   schemas:
 *     VaultModelDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         label:
 *           type: string
 *         secret:
 *           type: string
 *           format: password
 */
export type VaultModelDto = {
  id: string;
  label: string;
  secret: string;
};
