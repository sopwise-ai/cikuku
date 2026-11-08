import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryProvider } from "@/components/query-provider";
import Home from "./page";

vi.mock("next-themes", () => ({
  useTheme: () => ({ setTheme: vi.fn() }),
}));

describe("Home", () => {
  it("renders the hero and queries the API", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ status: "ok" }),
    } as Response);

    render(
      <QueryProvider>
        <Home />
      </QueryProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /production-ready starter/i,
    );
    expect(screen.getByRole("link", { name: /View source/i })).toHaveAttribute(
      "href",
      "https://github.com/sopwise-ai/cikuku",
    );
    expect(await screen.findByText("API healthy")).toBeInTheDocument();
  });
});
