import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  // By Tag Name
  await page.locator("input").click();
  // By ID
  page.locator("#inputEmail1");
  // By Class Name
  page.locator(".shape-rectangle");
  // By Attribute
  page.locator('[placeholder="Email"]');
  // By Class Value (full match)
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  // Combine Selectors
  page.locator("input[placeholder='Email'][nbinput]");

  // By Xpath
  page.locator('//*[@id="inputEmail1"]');

  // By Partial Text Match
  page.locator(':text-is("Using the Grid")');
});
