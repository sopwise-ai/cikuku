import { afterEach, describe, expect, it, vi } from "vitest";

describe("env", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("treats an empty NEXT_PUBLIC_APP_URL as unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.resetModules();

    const { env } = await import("./env");

    expect(env.NEXT_PUBLIC_APP_URL).toBeUndefined();
  });

  it("accepts an absolute URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com");
    vi.resetModules();

    const { env } = await import("./env");

    expect(env.NEXT_PUBLIC_APP_URL).toBe("https://example.com");
  });

  it("rejects an invalid URL", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "not-a-url");
    vi.resetModules();

    await expect(import("./env")).rejects.toThrow("Invalid environment variables");

    expect(JSON.stringify(consoleError.mock.calls)).toContain("NEXT_PUBLIC_APP_URL");
  });
});
