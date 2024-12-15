import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:4200");
});

test.describe("Form Layouts Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test2@test.com", {
      delay: 500,
    });

    // Generic Assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    // Locator Assertion
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });
});
