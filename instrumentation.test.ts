import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequestError } from "./instrumentation";

describe("onRequestError", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("logs a structured payload with request context", async () => {
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await onRequestError(
      Object.assign(new Error("boom"), { digest: "abc123" }),
      { path: "/dashboard", method: "GET" } as never,
      { routePath: "/dashboard", routerKind: "App Router" } as never,
    );

    expect(consoleError).toHaveBeenCalledOnce();
    expect(consoleError.mock.calls[0]?.[0]).toContain('"digest":"abc123"');
    expect(consoleError.mock.calls[0]?.[0]).toContain('"route":"/dashboard"');
  });
});
