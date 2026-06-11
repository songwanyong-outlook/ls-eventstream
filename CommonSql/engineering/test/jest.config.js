/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest/', // or other ESM presets
    globals: { 'ts-jest': { useESM: true } },
    testEnvironment: 'node',
    rootDir: '../..',
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
        "node_modules/(?!(monaco-editor)/)",
    ],
    setupFiles: ["<rootDir>/engineering/test/globalSetup.ts"],
};
