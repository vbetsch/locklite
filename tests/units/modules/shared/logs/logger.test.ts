import { Logger } from '@shared/logs/logger';
import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';

describe('Logger', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeAll((): void => {
    process.env.NODE_ENV = 'development';
  });

  afterAll((): void => {
    process.env.NODE_ENV = originalEnv;
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('should compute message without color', (): void => {
    const compute = (Logger as any)._compute as (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void;
    const result = compute.call(Logger, LoggerTagEnum.LOG, 'hello');
    expect(result).toEqual(`➔ ${LoggerTagEnum.LOG}: hello`);
  });

  it('should compute message with color', (): void => {
    const compute = (Logger as any)._compute as (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void;
    const result = compute.call(
      Logger,
      LoggerTagEnum.INFO,
      'info message',
      LoggerColorEnum.INFO
    );
    expect(result).toEqual(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: info message${LoggerColorEnum.RESET}`
    );
  });

  it('ok should log with SUCCESS color and OK tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    Logger.ok(LoggerTagEnum.INFO, 'test ok');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.OK}: test ok${LoggerColorEnum.RESET}`
    );
  });

  it('done should log with SUCCESS color and DONE tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    Logger.done(LoggerTagEnum.LOG, 'finished');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.DONE}: finished${LoggerColorEnum.RESET}`
    );
  });

  it('log should log without color and LOG tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    Logger.log('just a message');
    expect(spy).toHaveBeenCalledWith(`➔ ${LoggerTagEnum.LOG}: just a message`);
  });

  it('debug should debug with DEBUG color and DEBUG tag', (): void => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    Logger.debug('debugging');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.DEBUG}➔ ${LoggerTagEnum.DEBUG}: debugging${LoggerColorEnum.RESET}`
    );
  });

  it('info should info with INFO color and INFO tag', (): void => {
    const spy = jest.spyOn(console, 'info').mockImplementation(() => {});
    Logger.info('information');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: information${LoggerColorEnum.RESET}`
    );
  });

  it('warn should warn with WARNING color and WARN tag', (): void => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    Logger.warn('be careful');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.WARNING}➔ ${LoggerTagEnum.WARN}: be careful${LoggerColorEnum.RESET}`
    );
  });

  it('error should error with ERROR color and ERROR tag and include error object', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('oops');
    Logger.error('an error occurred', err);
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.ERROR}: an error occurred${LoggerColorEnum.RESET}`,
      err
    );
  });

  it('error should error with null message when message is null', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('oops');
    Logger.error(null, err);
    expect(spy).toHaveBeenCalledWith(null, err);
  });

  it('critical should error with ERROR color and CRITICAL tag and include error object', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('fatal');
    Logger.critical('critical failure', err);
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.CRITICAL}: critical failure${LoggerColorEnum.RESET}`,
      err
    );
  });
});
