import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("next-themes", () => ({
  useTheme: () => ({ setTheme: vi.fn() }),
}));

describe("Home", () => {
  it("renders the hero and the repository link", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /production-ready starter/i,
    );
    expect(screen.getByRole("link", { name: /View source/i })).toHaveAttribute(
      "href",
      "https://github.com/sopwise-ai/cikuku",
    );
  });
});
