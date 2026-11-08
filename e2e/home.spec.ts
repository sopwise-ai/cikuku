import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the starter heading", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Create Next App/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("To get started");
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});
