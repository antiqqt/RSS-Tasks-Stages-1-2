/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    resetMocks: false,
    setupFiles: ['jest-localstorage-mock'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/spec/styleMock.js',
    },
};
