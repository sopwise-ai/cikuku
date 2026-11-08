import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./error";

describe("ErrorBoundary", () => {
  it("logs the error and retries", () => {
    const error = new Error("boom");
    const retry = vi.fn();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ErrorBoundary error={error} retry={retry} />);

    expect(consoleError).toHaveBeenCalledWith(error);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
