import { test, expect } from "playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost/");
  await expect(
    page.getByRole("heading", { name: "Messages des utilisateurs" })
  ).toBeVisible();
});
