import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site";
import robots from "./robots";

describe("robots", () => {
  it("allows crawling and points at the sitemap", () => {
    const result = robots();

    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(new URL("/sitemap.xml", siteConfig.url).toString());
  });
});
