import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
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
    '^@prisma/(.*)$': '<rootDir>/prisma/$1',
    '^@api/(.*)$': '<rootDir>/src/projects/api/$1',
    '^@ui/(.*)$': '<rootDir>/src/projects/ui/$1',
    '^@shared/(.*)$': '<rootDir>/src/projects/shared/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/lib/', '<rootDir>/prisma/'],
};

export default config;
