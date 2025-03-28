module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/config/'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  clearMocks: true
};
