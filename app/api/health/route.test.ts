import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/server", () => ({
  connection: vi.fn(),
}));

import { connection } from "next/server";
import { GET } from "./route";

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.mocked(connection).mockClear();
  });

  it("returns an uncached ok status", async () => {
    const response = await GET();

    expect(connection).toHaveBeenCalledOnce();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });
});
