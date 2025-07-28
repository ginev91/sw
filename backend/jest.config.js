module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  coverageDirectory: '../coverage',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },
};