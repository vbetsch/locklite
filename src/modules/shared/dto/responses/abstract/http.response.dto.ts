import type { HttpBodyDto } from '@shared/dto/body/abstract/http.body.dto';
import type { HttpErrorDto } from '@shared/dto/errors/http.error.dto';

export type HttpResponseDto<Data> = HttpBodyDto<Data> | HttpErrorDto;
