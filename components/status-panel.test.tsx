import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusPanel } from "./status-panel";

describe("StatusPanel", () => {
  it("renders an optional eyebrow, heading, description, and action", () => {
    render(
      <StatusPanel
        eyebrow="404"
        title="Page not found"
        description="The page has moved."
        action={<button type="button">Back home</button>}
      />,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Page not found");
    expect(screen.getByText("The page has moved.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back home" })).toBeInTheDocument();
  });
});
