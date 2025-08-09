import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';

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
 *                 $ref: '#/components/schemas/VaultModelDto'
 */
export type GetMyVaultsDataDto = {
  myVaults: VaultModelDto[];
};
