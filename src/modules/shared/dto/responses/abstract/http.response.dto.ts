import type { HttpDataDto } from '@shared/dto/responses/abstract/http.data.dto';
import type { HttpErrorDto } from '@shared/dto/responses/http.error.dto';

export type HttpResponseDto<T> = HttpDataDto<T> | HttpErrorDto;
