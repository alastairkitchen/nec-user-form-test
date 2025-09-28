import nextJest from "next/jest.js";
import * as structuredClone from "@ungap/structured-clone";

const createJestConfig = nextJest({
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
  globals: {
    structuredClone: structuredClone.default, // fix ReferenceError: structuredClone is not defined errors
  },
};

export default createJestConfig(config);
