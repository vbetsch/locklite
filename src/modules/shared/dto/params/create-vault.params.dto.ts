/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultParamsDto:
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
export type CreateVaultParamsDto = {
  label: string;
  secret: string;
};
