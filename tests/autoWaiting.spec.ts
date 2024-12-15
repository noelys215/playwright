import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
  testInfo.setTimeout(testInfo.timeout * 2000);
});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  // await successButton.click();

  // await successButton.waitFor({ state: "attached" });

  // const text = await successButton.textContent();
  // expect(text).toEqual("Data loaded with AJAX get request.");
  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test("alt waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // Wait for element
  // await page.waitForSelector(".bg-success");

  // Wait for certain response
  // await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  // Wait for network calls to be completed
  await page.waitForLoadState("networkidle");

  const text = await successButton.textContent();
  expect(text).toEqual("Data loaded with AJAX get request.");
});

test("timeous", async ({ page }) => {
  test.setTimeout(20000);
  test.slow();
  const successButton = page.locator(".bg-success");
  await successButton.click({ timeout: 20000 });
});
