import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';
import { ApiLogger } from '@api/logs/api.logger';

describe('ApiLogger', () => {
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

  it('should compute message without color via override', (): void => {
    const compute = (ApiLogger as any)._compute as (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void;
    const result = compute.call(ApiLogger, LoggerTagEnum.LOG, 'hello');
    expect(result).toBe(`➔ ${LoggerTagEnum.LOG}: hello`);
  });

  it('should compute message with color via override', (): void => {
    const compute = (ApiLogger as any)._compute as (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void;
    const result = compute.call(
      ApiLogger,
      LoggerTagEnum.INFO,
      'info msg',
      LoggerColorEnum.INFO
    );
    expect(result).toBe(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: info msg${LoggerColorEnum.RESET}`
    );
  });

  it('ok should log with SUCCESS color and OK tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    ApiLogger.ok(LoggerTagEnum.OK, 'operation succeeded');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.OK}: operation succeeded${LoggerColorEnum.RESET}`
    );
  });

  it('done should log with SUCCESS color and DONE tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    ApiLogger.done(LoggerTagEnum.DONE, 'all done');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.DONE}: all done${LoggerColorEnum.RESET}`
    );
  });

  it('log should log without color and LOG tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    ApiLogger.log('simple message');
    expect(spy).toHaveBeenCalledWith(`➔ ${LoggerTagEnum.LOG}: simple message`);
  });

  it('debug should debug with DEBUG color and DEBUG tag', (): void => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    ApiLogger.debug('debugging');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.DEBUG}➔ ${LoggerTagEnum.DEBUG}: debugging${LoggerColorEnum.RESET}`
    );
  });

  it('info should info with INFO color and INFO tag', (): void => {
    const spy = jest.spyOn(console, 'info').mockImplementation(() => {});
    ApiLogger.info('information');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: information${LoggerColorEnum.RESET}`
    );
  });

  it('warn should warn with WARNING color and WARN tag', (): void => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    ApiLogger.warn('be cautious');
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.WARNING}➔ ${LoggerTagEnum.WARN}: be cautious${LoggerColorEnum.RESET}`
    );
  });

  it('error should error with ERROR color and ERROR tag and include error object', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('failure');
    ApiLogger.error('something broke', err);
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.ERROR}: something broke${LoggerColorEnum.RESET}`,
      err
    );
  });

  it('error should error with null message when message is null', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('failure');
    ApiLogger.error(null, err);
    expect(spy).toHaveBeenCalledWith(null, err);
  });

  it('critical should error with ERROR color and CRITICAL tag and include error object', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('fatal');
    ApiLogger.critical('critical failure', err);
    expect(spy).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.CRITICAL}: critical failure${LoggerColorEnum.RESET}`,
      err
    );
  });
});
