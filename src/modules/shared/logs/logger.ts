import { injectable } from 'tsyringe';
import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';

@injectable()
export class Logger {
  private readonly _prefix: string = '➔';

  private _compute(
    tag: LoggerTagEnum,
    message: string,
    color?: LoggerColorEnum
  ): string | void {
    if (process.env.NODE_ENV !== 'development') return;
    const content: string = `${this._prefix} ${tag}: ${message}`;
    if (color) {
      console.log(`${color}${content}${LoggerColorEnum.RESET}`);
    }
    return content;
  }

  public ok(tag: LoggerTagEnum, message: string): void {
    console.log(
      this._compute(LoggerTagEnum.OK, message, LoggerColorEnum.SUCCESS)
    );
  }

  public done(tag: LoggerTagEnum, message: string): void {
    console.log(
      this._compute(LoggerTagEnum.DONE, message, LoggerColorEnum.SUCCESS)
    );
  }

  public log(message: string): void {
    console.log(this._compute(LoggerTagEnum.LOG, message));
  }

  public debug(message: string): void {
    console.debug(
      this._compute(LoggerTagEnum.DEBUG, message, LoggerColorEnum.DEBUG)
    );
  }

  public info(message: string): void {
    console.info(
      this._compute(LoggerTagEnum.INFO, message, LoggerColorEnum.INFO)
    );
  }

  public warn(message: string): void {
    console.warn(
      this._compute(LoggerTagEnum.WARN, message, LoggerColorEnum.WARNING)
    );
  }

  public error(message: string): void {
    console.error(
      this._compute(LoggerTagEnum.ERROR, message, LoggerColorEnum.ERROR)
    );
  }

  public critical(message: string): void {
    console.error(
      this._compute(LoggerTagEnum.CRITICAL, message, LoggerColorEnum.ERROR)
    );
  }
}
