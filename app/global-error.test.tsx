import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import GlobalError from "./global-error";

describe("GlobalError", () => {
  it("renders the recovery UI and retries", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(<GlobalError error={new Error("boom")} retry={retry} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Something went wrong");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it("restores a stored dark theme", () => {
    localStorage.setItem("theme", "dark");
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(<GlobalError error={new Error("boom")} retry={vi.fn()} />);

    expect(document.documentElement).toHaveClass("dark");
  });

  it("follows the system preference when no theme is stored", () => {
    localStorage.removeItem("theme");
    const matchMedia = vi
      .spyOn(window, "matchMedia")
      .mockReturnValue({ matches: true } as MediaQueryList);
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(<GlobalError error={new Error("boom")} retry={vi.fn()} />);

    expect(document.documentElement).toHaveClass("dark");
    matchMedia.mockRestore();
  });
});
