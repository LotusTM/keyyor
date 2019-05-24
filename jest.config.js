module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: {
        warnOnly: true
      }
    }
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  // @todo Temporary fix for the https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '/.git/',
    '<rootDir>/build/',
    '<rootDir>/temp/',
    '/node_modules/'
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '^@data$': '<rootDir>/temp/data/scripts.js'
  },
  transform: {
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  }
}
