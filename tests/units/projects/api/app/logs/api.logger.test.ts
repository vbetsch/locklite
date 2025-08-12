import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';
import { ApiLogger } from '@api/app/api.logger';

interface ICompute {
  _compute(
    tag: LoggerTagEnum,
    message: string,
    color?: LoggerColorEnum
  ): string | void;
}

describe('ApiLogger', () => {
  const originalEnv: string | undefined = process.env.NODE_ENV;

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
    const compute: (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void = (ApiLogger as unknown as ICompute)._compute.bind(
      ApiLogger
    );
    const result: string | void = compute(LoggerTagEnum.LOG, 'hello');
    expect(result).toBe(`➔ ${LoggerTagEnum.LOG}: hello`);
  });

  it('should compute message with color via override', (): void => {
    const compute: (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void = (ApiLogger as unknown as ICompute)._compute.bind(
      ApiLogger
    );
    const result: string | void = compute(
      LoggerTagEnum.INFO,
      'info msg',
      LoggerColorEnum.INFO
    );
    expect(result).toBe(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: info msg${LoggerColorEnum.RESET}`
    );
  });

  it('ok should log with SUCCESS color and OK tag', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    ApiLogger.ok('operation succeeded');
    expect(spyLog).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.OK}: operation succeeded${LoggerColorEnum.RESET}`
    );
  });

  it('done should log with SUCCESS color and DONE tag', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    ApiLogger.done('all done');
    expect(spyLog).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.DONE}: all done${LoggerColorEnum.RESET}`
    );
  });

  it('log should log without color and LOG tag', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    ApiLogger.log('simple message');
    expect(spyLog).toHaveBeenCalledWith(
      `➔ ${LoggerTagEnum.LOG}: simple message`
    );
  });

  it('debug should debug with DEBUG color and DEBUG tag', (): void => {
    const spyDebug: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'debug')
      .mockImplementation((): void => void 0);
    ApiLogger.debug('debugging');
    expect(spyDebug).toHaveBeenCalledWith(
      `${LoggerColorEnum.DEBUG}➔ ${LoggerTagEnum.DEBUG}: debugging${LoggerColorEnum.RESET}`
    );
  });

  it('info should info with INFO color and INFO tag', (): void => {
    const spyInfo: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'info')
      .mockImplementation((): void => void 0);
    ApiLogger.info('information');
    expect(spyInfo).toHaveBeenCalledWith(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: information${LoggerColorEnum.RESET}`
    );
  });

  it('warn should warn with WARNING color and WARN tag', (): void => {
    const spyWarn: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => void 0);
    ApiLogger.warn('be cautious');
    expect(spyWarn).toHaveBeenCalledWith(
      `${LoggerColorEnum.WARNING}➔ ${LoggerTagEnum.WARN}: be cautious${LoggerColorEnum.RESET}`
    );
  });

  it('error should error with ERROR color and ERROR tag and include error object', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('failure');
    ApiLogger.error('something broke', err);
    expect(spyError).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.ERROR}: something broke${LoggerColorEnum.RESET}`,
      err
    );
  });

  it('error should error with null message when message is null', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('failure');
    ApiLogger.error(null, err);
    expect(spyError).toHaveBeenCalledWith(null, err);
  });

  it('critical should error with ERROR color and CRITICAL tag and include error object', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('fatal');
    ApiLogger.critical('critical failure', err);
    expect(spyError).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.CRITICAL}: critical failure${LoggerColorEnum.RESET}`,
      err
    );
  });
});
