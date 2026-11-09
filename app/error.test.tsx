import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./error";

describe("ErrorBoundary", () => {
  it("logs the error and retries", async () => {
    const user = userEvent.setup();
    const error = new Error("boom");
    const retry = vi.fn();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ErrorBoundary error={error} retry={retry} />);

    expect(consoleError).toHaveBeenCalledWith(error);
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
