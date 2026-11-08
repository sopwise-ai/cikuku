import { describe, expect, it } from "vitest";
import { env } from "@/lib/env";
import { siteConfig } from "./site";

describe("siteConfig", () => {
  it("exposes the site name and canonical URL", () => {
    expect(siteConfig.name).toBe("Cikuku");
    expect(siteConfig.url).toBe(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");
  });
});
