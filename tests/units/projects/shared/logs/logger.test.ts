import { LoggerTagEnum } from '@shared/logs/logger-tag.enum';
import { LoggerColorEnum } from '@shared/logs/logger-color.enum';
import type { LoggerErrorType } from '@shared/logs/logger.error.type';
import { Logger } from '@shared/logs/logger';

class TestableLogger extends Logger {
  public static testCompute(
    tag: LoggerTagEnum,
    message?: string,
    color?: LoggerColorEnum
  ): string | void {
    return this._compute(tag, message, color);
  }
}

describe('Logger', (): void => {
  const originalEnv: string | undefined = process.env.NODE_ENV;
  const originalConsoleLog: typeof console.log = console.log;
  const originalConsoleDebug: typeof console.debug = console.debug;
  const originalConsoleInfo: typeof console.info = console.info;
  const originalConsoleWarn: typeof console.warn = console.warn;
  const originalConsoleError: typeof console.error = console.error;

  let consoleLogSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach((): void => {
    process.env.NODE_ENV = 'development';
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach((): void => {
    process.env.NODE_ENV = originalEnv;
    console.log = originalConsoleLog;
    console.debug = originalConsoleDebug;
    console.info = originalConsoleInfo;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  describe('_compute', (): void => {
    it('should return void when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      const result: string | void = TestableLogger.testCompute(
        LoggerTagEnum.LOG,
        'test message',
        LoggerColorEnum.INFO
      );
      expect(result).toBeUndefined();
    });

    it('should return formatted message without color when color is not provided', (): void => {
      const result: string | void = TestableLogger.testCompute(
        LoggerTagEnum.LOG,
        'test message'
      );
      expect(result).toBe('➔ LOG: test message');
    });

    it('should return formatted message with color when color is provided', (): void => {
      const result: string | void = TestableLogger.testCompute(
        LoggerTagEnum.INFO,
        'test message',
        LoggerColorEnum.INFO
      );
      expect(result).toBe(
        `${LoggerColorEnum.INFO}➔ INFO: test message${LoggerColorEnum.RESET}`
      );
    });

    it('should return tag only when message is not provided', (): void => {
      const result: string | void = TestableLogger.testCompute(
        LoggerTagEnum.DEBUG
      );
      expect(result).toBe('➔ DEBUG: ');
    });
  });

  describe('ok', (): void => {
    it('should call console.log with success colored message', (): void => {
      Logger.ok('Operation successful');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `${LoggerColorEnum.SUCCESS}➔ OK: Operation successful${LoggerColorEnum.RESET}`
      );
    });

    it('should call console.log with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      Logger.ok('Operation successful');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('done', (): void => {
    it('should call console.log with success colored message', (): void => {
      Logger.done('Task completed');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `${LoggerColorEnum.SUCCESS}➔ DONE: Task completed${LoggerColorEnum.RESET}`
      );
    });

    it('should call console.log with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      Logger.done('Task completed');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('log', (): void => {
    it('should call console.log without color', (): void => {
      Logger.log('General log message');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith('➔ LOG: General log message');
    });

    it('should call console.log with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      Logger.log('General log message');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('debug', (): void => {
    it('should call console.debug with debug colored message', (): void => {
      Logger.debug('Debug information');
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
      expect(consoleDebugSpy).toHaveBeenCalledWith(
        `${LoggerColorEnum.DEBUG}➔ DEBUG: Debug information${LoggerColorEnum.RESET}`
      );
    });

    it('should call console.debug with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      Logger.debug('Debug information');
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
      expect(consoleDebugSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('info', (): void => {
    it('should call console.info with info colored message', (): void => {
      Logger.info('Information message');
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        `${LoggerColorEnum.INFO}➔ INFO: Information message${LoggerColorEnum.RESET}`
      );
    });

    it('should call console.info with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      Logger.info('Information message');
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
      expect(consoleInfoSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('warn', (): void => {
    it('should call console.warn with warning colored message', (): void => {
      Logger.warn('Warning message');
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        `${LoggerColorEnum.WARNING}➔ WARN: Warning message${LoggerColorEnum.RESET}`
      );
    });

    it('should call console.warn with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      Logger.warn('Warning message');
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('error', (): void => {
    it('should call console.error with error colored message and error object', (): void => {
      const mockError: Error = new Error('Test error');
      const errorArgs: LoggerErrorType = {
        message: 'An error occurred',
        error: mockError,
      };

      Logger.error(errorArgs);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `${LoggerColorEnum.ERROR}➔ ERROR: An error occurred${LoggerColorEnum.RESET}`,
        mockError
      );
    });

    it('should call console.error with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      const mockError: Error = new Error('Test error');
      const errorArgs: LoggerErrorType = {
        message: 'An error occurred',
        error: mockError,
      };

      Logger.error(errorArgs);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(undefined, mockError);
    });
  });

  describe('critical', (): void => {
    it('should call console.error with critical tagged message and error object', (): void => {
      const mockError: Error = new Error('Critical error');
      const errorArgs: LoggerErrorType = {
        message: 'Critical system failure',
        error: mockError,
      };

      Logger.critical(errorArgs);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `${LoggerColorEnum.ERROR}➔ CRITICAL: Critical system failure${LoggerColorEnum.RESET}`,
        mockError
      );
    });

    it('should call console.error with undefined when NODE_ENV is not development', (): void => {
      process.env.NODE_ENV = 'production';
      const mockError: Error = new Error('Critical error');
      const errorArgs: LoggerErrorType = {
        message: 'Critical system failure',
        error: mockError,
      };

      Logger.critical(errorArgs);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(undefined, mockError);
    });
  });

  describe('Integration tests', (): void => {
    it('should handle multiple log calls in sequence', (): void => {
      Logger.info('Starting process');
      Logger.debug('Processing item');
      Logger.warn('Low memory');
      Logger.ok('Process completed');

      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });

    it('should log with undefined when NODE_ENV is test', (): void => {
      process.env.NODE_ENV = 'test';
      const mockError: Error = new Error();

      Logger.ok('test');
      Logger.done('test');
      Logger.log('test');
      Logger.debug('test');
      Logger.info('test');
      Logger.warn('test');
      Logger.error({ message: 'test', error: mockError });
      Logger.critical({ message: 'test', error: mockError });

      const timesThree: number = 3;
      expect(consoleLogSpy).toHaveBeenCalledTimes(timesThree);
      expect(consoleLogSpy).toHaveBeenCalledWith(undefined);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
      expect(consoleDebugSpy).toHaveBeenCalledWith(undefined);
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
      expect(consoleInfoSpy).toHaveBeenCalledWith(undefined);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(undefined);
      const timesTwo: number = 2;
      expect(consoleErrorSpy).toHaveBeenCalledTimes(timesTwo);
      expect(consoleErrorSpy).toHaveBeenCalledWith(undefined, mockError);
    });
  });

  describe('Abstract class behavior', (): void => {
    it('should be defined as an abstract class', (): void => {
      expect(Logger).toBeDefined();
      expect(typeof Logger).toBe('function');
    });

    it('should have static methods accessible without instantiation', (): void => {
      expect(typeof Logger.ok).toBe('function');
      expect(typeof Logger.done).toBe('function');
      expect(typeof Logger.log).toBe('function');
      expect(typeof Logger.debug).toBe('function');
      expect(typeof Logger.info).toBe('function');
      expect(typeof Logger.warn).toBe('function');
      expect(typeof Logger.error).toBe('function');
      expect(typeof Logger.critical).toBe('function');
    });

    it('should have all static methods defined', (): void => {
      const staticMethods: string[] = [
        'ok',
        'done',
        'log',
        'debug',
        'info',
        'warn',
        'error',
        'critical',
      ];

      staticMethods.forEach((method: string): void => {
        expect(Logger).toHaveProperty(method);
        expect(typeof (Logger as Record<string, unknown>)[method]).toBe(
          'function'
        );
      });
    });
  });
});
