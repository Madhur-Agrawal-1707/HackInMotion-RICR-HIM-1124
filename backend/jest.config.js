module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  verbose: true,
  forceExit: true,
};
