import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { UiLogger } from '@ui/ui.logger';

interface ICompute {
  _compute(tag: LoggerTagEnum, message: string): string | void;
}

describe('UiLogger', () => {
  const originalEnv: string | undefined = process.env.NODE_ENV;

  beforeAll((): void => {
    process.env.NODE_ENV = 'development';
  });

  afterAll((): void => {
    process.env.NODE_ENV = originalEnv;
  });

  afterEach((): void => {
    jest.restoreAllMocks();
    process.env.NODE_ENV = 'development';
  });

  it('should compute message ignoring prefix and color', (): void => {
    const compute: (tag: LoggerTagEnum, message: string) => string | void = (
      UiLogger as unknown as ICompute
    )._compute.bind(UiLogger);
    const result: string | void = compute(LoggerTagEnum.INFO, 'test message');
    expect(result).toBe('INFO: test message');
  });

  it('ok should log with OK tag only message', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    UiLogger.ok('operation successful');
    expect(spyLog).toHaveBeenCalledWith('OK: operation successful');
  });

  it('done should log with DONE tag only message', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    UiLogger.done('all done');
    expect(spyLog).toHaveBeenCalledWith('DONE: all done');
  });

  it('log should log with LOG tag', (): void => {
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    UiLogger.log('simple log');
    expect(spyLog).toHaveBeenCalledWith('LOG: simple log');
  });

  it('debug should debug with DEBUG tag', (): void => {
    const spyDebug: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'debug')
      .mockImplementation((): void => void 0);
    UiLogger.debug('debugging');
    expect(spyDebug).toHaveBeenCalledWith('DEBUG: debugging');
  });

  it('info should info with INFO tag', (): void => {
    const spyInfo: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'info')
      .mockImplementation((): void => void 0);
    UiLogger.info('some info');
    expect(spyInfo).toHaveBeenCalledWith('INFO: some info');
  });

  it('warn should warn with WARN tag', (): void => {
    const spyWarn: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => void 0);
    UiLogger.warn('a warning');
    expect(spyWarn).toHaveBeenCalledWith('WARN: a warning');
  });

  it('error should error with ERROR tag and include error object', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('failure');
    UiLogger.error({ message: 'an error occurred', error: err });
    expect(spyError).toHaveBeenCalledWith('ERROR: an error occurred', err);
  });

  it('error should log null message when message is null', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('failure');
    UiLogger.error({ message: null, error: err });
    expect(spyError).toHaveBeenCalledWith(null, err);
  });

  it('critical should error with CRITICAL tag and include error object', (): void => {
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('critical failure');
    UiLogger.critical('critical failure', err);
    expect(spyError).toHaveBeenCalledWith('CRITICAL: critical failure', err);
  });

  it('logs void and error object when NODE_ENV is not development', (): void => {
    process.env.NODE_ENV = 'production';
    const spyLog: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => void 0);
    const spyError: jest.SpyInstance<void, [unknown, unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => void 0);
    const err: Error = new Error('err');

    UiLogger.log('will not log');
    UiLogger.error({ message: 'will not error', error: err });

    expect(spyLog).toHaveBeenCalledTimes(1);
    expect(spyLog.mock.calls[0][0]).toBe(void 0);

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError.mock.calls[0][0]).toBe(void 0);
    expect(spyError.mock.calls[0][1]).toBe(err);
  });
});
