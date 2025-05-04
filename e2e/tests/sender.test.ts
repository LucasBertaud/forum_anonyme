import { test, expect } from "playwright/test";

test("test", async ({ page }) => {
  const randomPseudo = Math.random().toString(36).substring(2, 15);
  await page.goto("http://localhost:8080/");
  await page.getByRole("textbox", { name: "Votre pseudo" }).click();
  await page.getByRole("textbox", { name: "Votre pseudo" }).fill(randomPseudo);
  await page.getByRole("button", { name: "Continuer" }).click();
  await expect(page.getByRole("heading")).toContainText(
    "Bonjour " + randomPseudo
  );
  await page.getByRole("textbox", { name: "Votre message" }).click();
  await page.getByRole("textbox", { name: "Votre message" }).fill("Salut");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await page.getByRole("textbox", { name: "Votre message" }).click();
  await page.getByRole("textbox", { name: "Votre message" }).fill("Test");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await expect(page.getByText("Message envoyé avec succès !")).toBeVisible();
});
