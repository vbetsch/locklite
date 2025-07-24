import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@api/(.*)$': '<rootDir>/src/modules/api/$1',
    '^@ui/(.*)$': '<rootDir>/src/modules/ui/$1',
    '^@shared/(.*)$': '<rootDir>/src/modules/shared/$1',
    '^@prisma/(.*)$': '<rootDir>/prisma/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/prisma/'],
};

export default config;
