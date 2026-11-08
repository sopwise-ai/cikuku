import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site";
import manifest from "./manifest";

describe("manifest", () => {
  it("describes the application", () => {
    const result = manifest();

    expect(result.name).toBe(siteConfig.name);
    expect(result.start_url).toBe("/");
    expect(result.icons?.[0]?.src).toBe("/favicon.ico");
  });
});
