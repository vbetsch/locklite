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
 *           description: Name of the vault
 *         secret:
 *           type: string
 *           description: Password, token, or other sensitive string to store
 */
export type CreateVaultPayloadDto = {
  label: string;
  secret: string;
};
