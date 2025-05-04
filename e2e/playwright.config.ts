import { defineConfig } from "playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  timeout: 10000,
  use: {
    baseURL: "http://localhost", // ou http://localhost:8080 si tu veux cibler sender
    headless: true,
  },
});
