import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultBodyDto:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             vaultCreated:
 *               $ref: '#/components/schemas/VaultModelDto'
 */
export type CreateVaultDataDto = {
  vaultCreated: VaultModelDto;
};
