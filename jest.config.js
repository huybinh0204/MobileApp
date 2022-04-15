module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/jest.setup.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  coverageDirectory: '<rootDir>/test/coverage',
  transformIgnorePatterns: ['node_modules/(?!react-native|@react-native|@react-navigation)'],
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
  reporters: ['default', '<rootDir>/node_modules/jest-html-reporter'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!src/**/index.js',
    '!src/utilities/**',
    '!src/navigators/**',
    '!src/constants/**',
    '!e2e/**/*.js',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/test/mocks/svgMock.js',
  },
};
