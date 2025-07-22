import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/modules/api/$1',
    '^@ui/(.*)$': '<rootDir>/src/modules/ui/$1',
    '^@shared/(.*)$': '<rootDir>/src/modules/shared/$1',
    '^@prisma/(.*)$': '<rootDir>/prisma/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1'
  }
};

export default config;
