import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*UseCase.ts',
    '!<rootDir>/src/modules/**/dtos/*.ts',
    '!<rootDir>/src/modules/**/repositories/*.ts',
    '!<rootDir>/src/modules/**/repositories/implementations/*.ts',
    '!<rootDir>/src/shared/infra/util/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 19,
      branches: 42,
      functions: 33,
      lines: 19,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  setupFiles: ['reflect-metadata'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
};
