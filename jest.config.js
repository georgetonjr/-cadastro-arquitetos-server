module.exports = {
  bail: true,
  clearMocks: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.test.ts?(x)', '**/*.spec.ts?(x)'],
  cacheDirectory: '<rootDir>/target/jest-cache',
  coveragePathIgnorePatterns: [
    'node_modules',
    '.mock.ts',
    'dist',
  ],
  coverageDirectory: '<rootDir>/target/test-results/',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './target/test-results/',
        outputName: 'tests-results-jest.xml',
      },
    ],
  ],
  transformIgnorePatterns: ['node_modules/'],
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
};
