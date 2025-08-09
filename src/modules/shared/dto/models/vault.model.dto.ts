/**
 * @swagger
 * components:
 *   schemas:
 *     VaultModelDto:
 *       type: object
 *       required:
 *        - id
 *        - label
 *        - secret
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
 *           description: password, token, code or other sensitive string to store
 *           format: password
 */
export type VaultModelDto = {
  id: string;
  label: string;
  secret: string;
};
