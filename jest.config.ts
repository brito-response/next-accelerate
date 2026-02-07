import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ["<rootDir>/tests/setup-tests.ts"],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.test.json' }]
  },
  globals: {},
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['lcov', 'text'],
};

export default config;
