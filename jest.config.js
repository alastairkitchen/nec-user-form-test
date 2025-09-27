import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>@/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// module.exports = config;

export default createJestConfig(config);
