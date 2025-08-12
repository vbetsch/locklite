/**
 * @swagger
 * components:
 *   schemas:
 *     ProvidersBodyDto:
 *       type: object
 *       description: Map of provider identifiers to provider details
 *       additionalProperties:
 *         $ref: '#/components/schemas/ProviderModelDto'
 */
import type { ProviderModelDto } from '@shared/modules/auth/dto/providers/provider.model.dto';

export type ProvidersBodyDto = {
  [providerId: string]: ProviderModelDto;
};
