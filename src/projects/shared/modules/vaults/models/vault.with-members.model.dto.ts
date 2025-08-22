import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     VaultWithMembersModelDto:
 *       type: object
 *       required:
 *        - id
 *        - label
 *        - secret
 *        - members
 *       properties:
 *         id:
 *           type: string
 *           description: UUID
 *           format: uuid
 *         label:
 *           type: string
 *           description: name of the vault
 *           example: Google, Amazon, Netflix, Disney+ or the other
 *         secret:
 *           type: string
 *           description: password, token, code or other sensitive string to store
 *           format: password
 *         members:
 *           type: array
 *           description: users with access to the vault
 *           items:
 *             $ref: '#/components/schemas/VaultMemberModelDto'
 */
export type VaultWithMembersModelDto = {
  id: string;
  label: string;
  secret: string;
  members: VaultMemberModelDto[];
};
