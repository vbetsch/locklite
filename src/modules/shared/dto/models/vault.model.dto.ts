/**
 * @swagger
 * components:
 *   schemas:
 *     VaultModelDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UUID
 *           format: uuid
 *         label:
 *           type: string
 *           description: name of the vault
 *           example: Google, Amazon, Netflix, Disney+
 *         secret:
 *           type: string
 *           description: password, code, token, any string
 *           format: password
 */
export type VaultModelDto = {
  id: string;
  label: string;
  secret: string;
};
