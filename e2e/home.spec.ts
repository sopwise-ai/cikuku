import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the starter heading", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Cikuku/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("To get started");
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
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
