import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetMyVaultsResponseDto:
 *       type: object
 *       properties:
 *         myVaults:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/VaultModelDto'
 */
export type GetMyVaultsResponseDto = HttpResponseDto<{
  myVaults: VaultModelDto[];
}>;
