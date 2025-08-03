import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Logger {
  protected static readonly _prefix: string = '➔';

  protected static _compute(
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

  public static ok(tag: LoggerTagEnum, message: string): void {
    console.log(
      this._compute(LoggerTagEnum.OK, message, LoggerColorEnum.SUCCESS)
    );
  }

  public static done(tag: LoggerTagEnum, message: string): void {
    console.log(
      this._compute(LoggerTagEnum.DONE, message, LoggerColorEnum.SUCCESS)
    );
  }

  public static log(message: string): void {
    console.log(this._compute(LoggerTagEnum.LOG, message));
  }

  public static debug(message: string): void {
    console.debug(
      this._compute(LoggerTagEnum.DEBUG, message, LoggerColorEnum.DEBUG)
    );
  }

  public static info(message: string): void {
    console.info(
      this._compute(LoggerTagEnum.INFO, message, LoggerColorEnum.INFO)
    );
  }

  public static warn(message: string): void {
    console.warn(
      this._compute(LoggerTagEnum.WARN, message, LoggerColorEnum.WARNING)
    );
  }

  public static error(message: string | null, error?: unknown): void {
    console.error(
      message
        ? this._compute(LoggerTagEnum.ERROR, message, LoggerColorEnum.ERROR)
        : null,
      error
    );
  }

  public static critical(message: string, error?: unknown): void {
    console.error(
      this._compute(LoggerTagEnum.CRITICAL, message, LoggerColorEnum.ERROR),
      error
    );
  }
}
