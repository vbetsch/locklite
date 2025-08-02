import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetMyVaultsResponseDto:
 *       type: object
 *       properties:
 *         data: object
 *         properties
 *           myVaults:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/VaultModelDto'
 */
export type GetMyVaultsDataDto = {
  myVaults: VaultModelDto[];
};
