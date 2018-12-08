module.exports = {
  roots: [
    "<rootDir>/"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  preset: "ts-jest",
  testMatch: ["(/__tests__/.*/.*(test|spec))\\.ts?$", '**/?(*.)(spec|test).ts'],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.jest.json',
      diagnostics: false
    }
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70
    }
  }
}