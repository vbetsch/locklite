/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultPayloadDto:
 *       type: object
 *       required:
 *         - label
 *         - secret
 *       properties:
 *         label:
 *           type: string
 *           description: name of the vault
 *           example: Google, Amazon, Netflix, Disney+ or the other
 *         secret:
 *           type: string
 *           description: password, token, code or other sensitive string to store
 *           format: password
 */
export type CreateVaultPayloadDto = {
  label: string;
  secret: string;
};
