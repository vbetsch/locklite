import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultDataDto:
 *       type: object
 *       properties:
 *         vaultCreated:
 *           $ref: '#/components/schemas/VaultModelDto'
 */
export type CreateVaultDataDto = {
  vaultCreated: VaultModelDto;
};
