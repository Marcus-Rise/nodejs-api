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
    }
}
