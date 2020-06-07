module.exports = {
    setupFiles: ["./jest.setup.js"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    testEnvironment: "node",
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/index.ts",
        "!src/shared/*",
        "!src/IoCAdapter.ts",
        "!src/Db.ts",
        "!src/LoadEnv.ts",
        "!src/services/serviceContainer.ts",
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        },
    }
}
