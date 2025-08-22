import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     EditMembersDataDto:
 *       type: object
 *       required:
 *        - data
 *       properties:
 *         data:
 *           type: object
 *           required:
 *            - vaultUpdated
 *           properties:
 *             vaultUpdated:
 *               $ref: '#/components/schemas/VaultWithMembersModelDto'
 */
export type EditMembersDataDto = {
  vaultUpdated: VaultWithMembersModelDto;
};
