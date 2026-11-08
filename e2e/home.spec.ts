import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the starter heading", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Cikuku/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "A production-ready starter",
    );
  });

  test("switches between themes", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Toggle theme" }).click();
    await page.getByRole("menuitem", { name: "Dark" }).click();

    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });

  test("serves a health endpoint", async ({ request }) => {
    const response = await request.get("/api/health");

    expect(response.ok()).toBe(true);
    expect(response.headers()["cache-control"]).toContain("no-store");
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  test("reports API health on the page", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("status")).toContainText("API healthy");
  });

  test("sends a content security policy", async ({ page }) => {
    const response = await page.goto("/");
    const contentSecurityPolicy = response?.headers()["content-security-policy"];

    expect(contentSecurityPolicy).toContain("default-src 'self'");
    expect(contentSecurityPolicy).toContain("object-src 'none'");
    expect(contentSecurityPolicy).toContain("frame-ancestors 'none'");
  });
});

test("renders the not-found page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
});
