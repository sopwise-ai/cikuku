import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists the canonical URL", () => {
    const [entry] = sitemap();

    expect(entry?.url).toBe(siteConfig.url);
    expect(entry?.changeFrequency).toBe("monthly");
  });
});
