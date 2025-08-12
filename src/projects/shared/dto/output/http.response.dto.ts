import type { HttpBodyDto } from '@shared/dto/output/http.body.dto';
import type { HttpErrorDto } from '@shared/dto/output/errors/http.error.dto';
import type { BusinessErrorDto } from '@shared/dto/output/errors/business.error.dto';

export type HttpResponseDto<Data> =
  | HttpBodyDto<Data>
  | HttpErrorDto
  | BusinessErrorDto;
