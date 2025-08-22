import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     ShareVaultPayloadDto:
 *       type: object
 *       required:
 *         - sharedWithMembers
 *       properties:
 *         sharedWithMembers:
 *           type: array
 *           description: users with access to the vault
 *           items:
 *             $ref: '#/components/schemas/VaultMemberModelDto'
 */
export type ShareVaultPayloadDto = {
  sharedWithMembers: VaultMemberModelDto[];
};
