const jsdom = require('jsdom');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
      ".(ts|tsx)": "ts-jest"
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss|less)$',
  ],
  moduleNameMapper: {
    '^example/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ["node_modules", "src"], 
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
};