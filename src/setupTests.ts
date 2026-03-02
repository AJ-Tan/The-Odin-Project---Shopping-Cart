import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Optional: Explicit cleanup after each test (already handled by jest-dom/vitest, but good for clarity)
afterEach(() => {
  cleanup();
});
