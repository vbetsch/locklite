/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultRequestDto:
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
export type CreateVaultRequestDto = {
  label: string;
  secret: string;
};
