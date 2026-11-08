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
  it("reports a healthy API", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ status: "ok" }),
    } as Response);

    renderStatus();

    expect(await screen.findByText("API healthy")).toBeInTheDocument();
  });

  it("reports an unavailable API", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    renderStatus();

    expect(await screen.findByText("API unavailable")).toBeInTheDocument();
  });
});
