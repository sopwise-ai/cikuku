import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loading from "./loading";

describe("Loading", () => {
  it("announces a busy state", () => {
    render(<Loading />);

    expect(screen.getByRole("main", { name: "Loading page" })).toHaveAttribute("aria-busy", "true");
  });
});
