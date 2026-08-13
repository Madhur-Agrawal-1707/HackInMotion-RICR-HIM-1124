module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  setupFiles: ['<rootDir>/test/setup.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  transformIgnorePatterns: [
    '/node_modules/(?!(jose|jwks-rsa|firebase-admin)/)'
  ],
};
