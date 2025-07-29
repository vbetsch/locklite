import type { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVaultResponseDto:
 *       type: object
 *       properties:
 *         vault:
 *           $ref: '#/components/schemas/VaultModelDto'
 */
export type CreateVaultResponseDto = HttpResponseDto<{
  vaultCreated: VaultModelDto;
}>;
