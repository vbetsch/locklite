import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {}],
  },
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@api/(.*)$': '<rootDir>/src/modules/api/$1',
    '^@ui/(.*)$': '<rootDir>/src/modules/ui/$1',
    '^@shared/(.*)$': '<rootDir>/src/modules/shared/$1',
    '^@prisma/(.*)$': '<rootDir>/prisma/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
  },
};

export default config;
