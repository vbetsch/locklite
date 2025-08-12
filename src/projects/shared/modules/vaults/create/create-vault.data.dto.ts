import type { VaultModelDto } from '@shared/modules/vaults/vault.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultDataDto:
 *       type: object
 *       required:
 *        - data
 *       properties:
 *         data:
 *           type: object
 *           required:
 *            - vaultCreated
 *           properties:
 *             vaultCreated:
 *               $ref: '#/components/schemas/VaultModelDto'
 */
export type CreateVaultDataDto = {
  vaultCreated: VaultModelDto;
};
