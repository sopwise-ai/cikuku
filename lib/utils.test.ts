import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges conflicting classes and drops falsy values", () => {
    expect(cn("px-2", false && "hidden", "px-4", "py-1")).toBe("px-4 py-1");
  });
});
