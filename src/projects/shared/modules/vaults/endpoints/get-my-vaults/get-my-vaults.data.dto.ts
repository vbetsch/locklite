import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetMyVaultsDataDto:
 *       type: object
 *       required:
 *        - data
 *       properties:
 *         data:
 *           type: object
 *           required:
 *            - myVaults
 *           properties:
 *             myVaults:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VaultWithMembersModelDto'
 */
export type GetMyVaultsDataDto = {
  myVaults: VaultWithMembersModelDto[];
};
