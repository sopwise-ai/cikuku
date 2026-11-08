import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "./theme-provider";

describe("ThemeProvider", () => {
  it("renders its children", () => {
    render(
      <ThemeProvider attribute="class">
        <span>themed content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText("themed content")).toBeInTheDocument();
  });
});
