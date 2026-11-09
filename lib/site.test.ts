import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("siteConfig", () => {
  it("falls back to localhost outside production", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");

    const { siteConfig } = await import("./site");

    expect(siteConfig.url).toBe("http://localhost:3000");
  });

  it("uses the configured URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com");

    const { siteConfig } = await import("./site");

    expect(siteConfig.url).toBe("https://example.com");
  });

  it("rejects a production build without a URL", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");

    await expect(import("./site")).rejects.toThrow("NEXT_PUBLIC_APP_URL");
  });

  it("rejects localhost in a production build", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000");

    await expect(import("./site")).rejects.toThrow("localhost");
  });

  it("accepts a production build with a URL", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com");

    const { siteConfig } = await import("./site");

    expect(siteConfig.url).toBe("https://example.com");
  });
});
