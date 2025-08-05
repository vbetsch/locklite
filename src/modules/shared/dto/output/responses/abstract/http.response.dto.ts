import type { HttpBodyDto } from '@shared/dto/output/body/abstract/http.body.dto';
import type { HttpErrorDto } from '@shared/dto/output/errors/http.error.dto';

export type HttpResponseDto<Data> = HttpBodyDto<Data> | HttpErrorDto;
