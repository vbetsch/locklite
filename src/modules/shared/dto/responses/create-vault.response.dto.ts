import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultResponseDto:
 *       type: object
 *       properties:
 *         data: object
 *         properties:
 *           vaultCreated:
 *             $ref: '#/components/schemas/VaultModelDto'
 */
export type CreateVaultResponseDto = HttpResponseDto<{
  vaultCreated: VaultModelDto;
}>;
