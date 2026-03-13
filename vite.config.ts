/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true, // Enables global test functions like describe, it, expect without imports
    environment: "jsdom", // Simulates browser DOM for React tests
    setupFiles: "./src/setupTests.ts", // Optional: Path to a setup file (create it in Step 5)
    css: true, // Optional: Include CSS in tests if needed
  },
  base: "/The-Odin-Project---Shopping-Cart/",
});
