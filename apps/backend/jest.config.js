module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@app/fetch(|/.*)$': '<rootDir>/libs/fetch/src/$1',
    '^@app/global(|/.*)$': '<rootDir>/libs/global/src/$1',
  },
};
