import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["vitest.setup.ts", "@testing-library/jest-dom/vitest"],
    globals: true,
    environment: "jsdom",
    include: ["**/?(*.)test.ts?(x)"],
    testTimeout: 10000,
    browser: {
      enabled: false, // enabled through CLI
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      headless: !!process.env.CI,
      viewport: {
        width: 1024,
        height: 896
      }
    },
    coverage: {
      exclude: ["./build/**"],
      reportsDirectory: "./.coverage",
      reporter: ["text", "lcov"]
    }
  }
});
