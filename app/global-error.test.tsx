import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import GlobalError from "./global-error";

describe("GlobalError", () => {
  it("renders a document with the recovery UI", () => {
    const html = renderToStaticMarkup(<GlobalError error={new Error("boom")} retry={vi.fn()} />);

    expect(html).toContain("<html");
    expect(html).toContain("Something went wrong");
  });
});
