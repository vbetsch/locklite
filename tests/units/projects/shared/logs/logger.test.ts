import { Logger } from '@shared/logs/logger';
import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';

interface ICompute {
  _compute(
    tag: LoggerTagEnum,
    message: string,
    color?: LoggerColorEnum
  ): string | void;
}

describe('Logger', () => {
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

  it('should compute message without color', (): void => {
    const compute: (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void = (Logger as unknown as ICompute)._compute.bind(Logger);
    const result: string | void = compute(LoggerTagEnum.LOG, 'hello');
    expect(result).toEqual(`➔ ${LoggerTagEnum.LOG}: hello`);
  });

  it('should compute message with color', (): void => {
    const compute: (
      tag: LoggerTagEnum,
      message: string,
      color?: LoggerColorEnum
    ) => string | void = (Logger as unknown as ICompute)._compute.bind(Logger);
    const result: string | void = compute(
      LoggerTagEnum.INFO,
      'info message',
      LoggerColorEnum.INFO
    );
    expect(result).toEqual(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: info message${LoggerColorEnum.RESET}`
    );
  });

  it('ok should log with SUCCESS color and OK tag', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    Logger.ok('test ok');
    expect(spyLog).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.OK}: test ok${LoggerColorEnum.RESET}`
    );
  });

  it('done should log with SUCCESS color and DONE tag', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    Logger.done('finished');
    expect(spyLog).toHaveBeenCalledWith(
      `${LoggerColorEnum.SUCCESS}➔ ${LoggerTagEnum.DONE}: finished${LoggerColorEnum.RESET}`
    );
  });

  it('log should log without color and LOG tag', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    Logger.log('just a message');
    expect(spyLog).toHaveBeenCalledWith(
      `➔ ${LoggerTagEnum.LOG}: just a message`
    );
  });

  it('debug should debug with DEBUG color and DEBUG tag', (): void => {
    const spyDebug: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'debug')
      .mockImplementation((): void => void 0);
    Logger.debug('debugging');
    expect(spyDebug).toHaveBeenCalledWith(
      `${LoggerColorEnum.DEBUG}➔ ${LoggerTagEnum.DEBUG}: debugging${LoggerColorEnum.RESET}`
    );
  });

  it('info should info with INFO color and INFO tag', (): void => {
    const spyInfo: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'info')
      .mockImplementation((): void => void 0);
    Logger.info('information');
    expect(spyInfo).toHaveBeenCalledWith(
      `${LoggerColorEnum.INFO}➔ ${LoggerTagEnum.INFO}: information${LoggerColorEnum.RESET}`
    );
  });

  it('warn should warn with WARNING color and WARN tag', (): void => {
    const spyWarn: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => void 0);
    Logger.warn('be careful');
    expect(spyWarn).toHaveBeenCalledWith(
      `${LoggerColorEnum.WARNING}➔ ${LoggerTagEnum.WARN}: be careful${LoggerColorEnum.RESET}`
    );
  });

  it('error should error with ERROR color and ERROR tag and include error object', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('oops');
    Logger.error({ message: 'an error occurred', error: err });
    expect(spyError).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.ERROR}: an error occurred${LoggerColorEnum.RESET}`,
      err
    );
  });

  it('error should error with null message when message is null', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('oops');
    Logger.error({ message: null, error: err });
    expect(spyError).toHaveBeenCalledWith(null, err);
  });

  it('critical should error with ERROR color and CRITICAL tag and include error object', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('fatal');
    Logger.critical('critical failure', err);
    expect(spyError).toHaveBeenCalledWith(
      `${LoggerColorEnum.ERROR}➔ ${LoggerTagEnum.CRITICAL}: critical failure${LoggerColorEnum.RESET}`,
      err
    );
  });
});
