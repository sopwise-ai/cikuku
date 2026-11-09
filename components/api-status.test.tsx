import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryProvider } from "@/components/query-provider";
import { ApiStatus } from "./api-status";

function renderStatus() {
  return render(
    <QueryProvider>
      <ApiStatus />
    </QueryProvider>,
  );
}

describe("ApiStatus", () => {
  it("reports a healthy API and sends a timeout signal", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ status: "ok" }),
    } as Response);

    renderStatus();

    expect(await screen.findByText("API healthy")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/health",
      expect.objectContaining({
        cache: "no-store",
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("reports an unavailable API for a non-2xx response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    renderStatus();

    expect(await screen.findByText("API unavailable")).toBeInTheDocument();
  });

  it("reports an unavailable API when the request rejects", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("network"));

    renderStatus();

    expect(await screen.findByText("API unavailable")).toBeInTheDocument();
  });

  it("reports an unavailable API for an invalid payload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ status: "degraded" }),
    } as Response);

    renderStatus();

    expect(await screen.findByText("API unavailable")).toBeInTheDocument();
  });

  it("shows a pending state before the request settles", async () => {
    let resolveFetch: (response: Response) => void = () => {};
    const pending = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });

    vi.spyOn(globalThis, "fetch").mockReturnValue(pending);

    renderStatus();

    expect(screen.getByText("Checking API")).toBeInTheDocument();

    resolveFetch({
      ok: true,
      json: async () => ({ status: "ok" }),
    } as Response);

    expect(await screen.findByText("API healthy")).toBeInTheDocument();
  });
});
