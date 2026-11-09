import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function loadInstrumentation() {
  return import("./instrumentation");
}

describe("onRequestError", () => {
  it("logs node errors with a redacted path", async () => {
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const { onRequestError } = await loadInstrumentation();

    await onRequestError(
      Object.assign(new Error("boom"), { digest: "abc123" }),
      { path: "/dashboard?token=secret", method: "GET" } as never,
      { routePath: "/dashboard", routerKind: "App Router" } as never,
    );

    const payload = String(consoleError.mock.calls[0]?.[0]);

    expect(payload).toContain('"runtime":"nodejs"');
    expect(payload).toContain('"digest":"abc123"');
    expect(payload).toContain('"path":"/dashboard"');
    expect(payload).not.toContain("secret");
  });

  it("logs edge errors", async () => {
    vi.stubEnv("NEXT_RUNTIME", "edge");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const { onRequestError } = await loadInstrumentation();

    await onRequestError(
      new Error("boom"),
      { path: "/", method: "GET" } as never,
      { routePath: "/", routerKind: "App Router" } as never,
    );

    expect(String(consoleError.mock.calls[0]?.[0])).toContain('"runtime":"edge"');
  });

  it("handles string errors without a digest", async () => {
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const { onRequestError } = await loadInstrumentation();

    await onRequestError(
      "boom",
      { path: "/", method: "GET" } as never,
      { routePath: "/", routerKind: "App Router" } as never,
    );

    const payload = String(consoleError.mock.calls[0]?.[0]);

    expect(payload).toContain('"message":"boom"');
    expect(payload).not.toContain("digest");
  });
});
