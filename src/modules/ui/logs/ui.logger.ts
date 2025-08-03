import { Logger } from '@shared/logs/logger';
import type { LoggerTagEnum } from '@shared/logs/logger-tag.enum';

export class UiLogger extends Logger {
  protected static override _compute(
    tag: LoggerTagEnum,
    message: string
  ): string | void {
    if (process.env.NODE_ENV !== 'development') return;
    return `${this._prefix} ${tag}: ${message}`;
  }
}
