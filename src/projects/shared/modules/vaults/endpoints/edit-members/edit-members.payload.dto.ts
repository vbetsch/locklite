import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     EditMembersPayloadDto:
 *       type: object
 *       required:
 *         - members
 *       properties:
 *         members:
 *           type: array
 *           description: users with access to the vault
 *           items:
 *             $ref: '#/components/schemas/VaultMemberModelDto'
 */
export type EditMembersPayloadDto = {
  members: VaultMemberModelDto[];
};
