import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { UiLogger } from '@ui/logs/ui.logger';

describe('UiLogger', () => {
  const originalEnv = process.env.NODE_ENV;

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
    const compute = (UiLogger as any)._compute as (
      tag: LoggerTagEnum,
      message: string
    ) => string | void;
    const result = compute.call(UiLogger, LoggerTagEnum.INFO, 'test message');
    expect(result).toBe(`INFO: test message`);
  });

  it('ok should log with OK tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation((): void => {});
    UiLogger.ok(LoggerTagEnum.INFO, 'operation successful');
    expect(spy).toHaveBeenCalledWith('OK: operation successful');
  });

  it('done should log with DONE tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation((): void => {});
    UiLogger.done(LoggerTagEnum.LOG, 'all done');
    expect(spy).toHaveBeenCalledWith('DONE: all done');
  });

  it('log should log with LOG tag', (): void => {
    const spy = jest.spyOn(console, 'log').mockImplementation((): void => {});
    UiLogger.log('simple log');
    expect(spy).toHaveBeenCalledWith('LOG: simple log');
  });

  it('debug should debug with DEBUG tag', (): void => {
    const spy = jest.spyOn(console, 'debug').mockImplementation((): void => {});
    UiLogger.debug('debugging');
    expect(spy).toHaveBeenCalledWith('DEBUG: debugging');
  });

  it('info should info with INFO tag', (): void => {
    const spy = jest.spyOn(console, 'info').mockImplementation((): void => {});
    UiLogger.info('some info');
    expect(spy).toHaveBeenCalledWith('INFO: some info');
  });

  it('warn should warn with WARN tag', (): void => {
    const spy = jest.spyOn(console, 'warn').mockImplementation((): void => {});
    UiLogger.warn('a warning');
    expect(spy).toHaveBeenCalledWith('WARN: a warning');
  });

  it('error should error with ERROR tag and include error object', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation((): void => {});
    const err = new Error('failure');
    UiLogger.error('an error occurred', err);
    expect(spy).toHaveBeenCalledWith('ERROR: an error occurred', err);
  });

  it('error should log null message when message is null', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation((): void => {});
    const err = new Error('failure');
    UiLogger.error(null, err);
    expect(spy).toHaveBeenCalledWith(null, err);
  });

  it('critical should error with CRITICAL tag and include error object', (): void => {
    const spy = jest.spyOn(console, 'error').mockImplementation((): void => {});
    const err = new Error('critical failure');
    UiLogger.critical('something went terribly wrong', err);
    expect(spy).toHaveBeenCalledWith(
      'CRITICAL: something went terribly wrong',
      err
    );
  });

  it('logs undefined when NODE_ENV is not development', (): void => {
    process.env.NODE_ENV = 'production';
    const spyLog = jest
      .spyOn(console, 'log')
      .mockImplementation((): void => {});
    const spyError = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => {});
    const err = new Error('err');

    UiLogger.log('will not log');
    UiLogger.error('will not error', err);

    expect(spyLog).toHaveBeenCalledWith(undefined);
    expect(spyError).toHaveBeenCalledWith(undefined, err);
  });
});
