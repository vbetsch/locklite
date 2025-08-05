import { Logger } from '@shared/logs/logger';
import type { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';

export class ApiLogger extends Logger {
  protected static override _compute(
    tag: LoggerTagEnum,
    message: string,
    color?: LoggerColorEnum
  ): string | void {
    if (process.env.NODE_ENV !== 'development') return;
    const content: string = `${this._prefix} ${tag}: ${message}`;
    if (color) {
      return `${color}${content}${LoggerColorEnum.RESET}`;
    }
    return content;
  }
}
