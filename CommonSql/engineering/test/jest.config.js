const path = require('path');
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest/', // or other ESM presets
    globals: { 'ts-jest': { useESM: true } },
    testEnvironment: 'node',
    rootDir: '../..',
    coverageDirectory: path.resolve(__dirname, '../../CommonSql/coverage'),
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        "monaco-editor": "<rootDir>/node_modules/monaco-editor/esm/vs/editor/editor.api.js",    
        "\\.(css|scss)$": "<rootDir>/engineering/test/mocks/styleMock.js",
        "@CommonSqlCore/(.*)": "<rootDir>/CommonSqlCore/$1",
        "@CommonSqlFacade/(.*)": "<rootDir>/CommonSqlFacade/$1",
        "@CommonSqlUtils/(.*)": "<rootDir>/CommonSqlUtils/$1",
        "@engineering/(.*)": "<rootDir>/engineering/$1",
    },
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": ['babel-jest', { configFile: './engineering/test/babel.config.cjs' }],
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
    transformIgnorePatterns: [
        "node_modules/(?!(monaco-editor)/)","CommonSqlCore/src/language-service/Intellicode/model/SqlProdModel\\.ts$"
    ],
    setupFiles: ["<rootDir>/engineering/test/globalSetup.ts"],
    reporters: [
        'default',
        [
            'jest-junit',
            {
              suiteName: 'LanguageService tests',
              outputDirectory: './test-results',
              outputName: 'test-results.xml'
            },
        ],
    ],
    collectCoverage: true,
    coverageReporters: ['cobertura', 'text-summary'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'CommonSqlCore/src/language-service/Intellicode/**/*.{ts,tsx}',
      'CommonSqlCore/src/language-service/Parser/CSIncrementalParsingCache.ts',
      'CommonSqlCore/src/language-service/Parser/CSScriptFormatter.ts',
      'CommonSqlFacade/src/SqlUtils/**/*.{ts,tsx}',
      'CommonSqlFacade/src/LanguageServicePerformanceWatcher.ts',
      'CommonSqlUtils/**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/GeneratedParser/**',
    ],
};
