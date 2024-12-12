// Import the Playwright testing module
import { test } from "@playwright/test";

// A setup function that runs before each test
test.beforeEach(async ({ page }) => {
  await page.goto("localhost:4200"); // Navigate to the local development server
  await page.getByText("Forms").click(); // Click on the "Forms" text link
  await page.getByText("Form Layouts").click(); // Click on the "Form Layouts" text link
});

// A test to demonstrate different locator syntax rules
test("Locator syntax rules", async ({ page }) => {
  // Locate an element by its tag name
  await page.locator("input").click();

  // Locate an element by its ID
  page.locator("#inputEmail1");

  // Locate an element by its class name
  page.locator(".shape-rectangle");

  // Locate an element by a specific attribute
  page.locator('[placeholder="Email"]');

  // Locate an element by its exact class value
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  // Combine multiple selectors to narrow down the match
  page.locator("input[placeholder='Email'][nbinput]");

  // Locate an element using XPath syntax
  page.locator('//*[@id="inputEmail1"]');

  // Locate an element by partially matching its text content
  page.locator(':text-is("Using the Grid")');
});

// A test to demonstrate user-facing locators
test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click(); // Locate a textbox by its role and accessible name and click it
  await page.getByRole("button", { name: "Sign in" }).first().click(); // Locate a button by its role and accessible name and click it

  await page.getByLabel("Email").first().click(); // Locate an input field by its associated label text

  await page.getByPlaceholder("Jane Doe").click(); // Locate an input field by its placeholder text

  await page.getByText("Using the Grid").click(); // Locate an element by its exact text and click it

  // Locate an element by its title (commented out, optional use case)
  // await page.getByTitle("Iot Dashboard").click();

  await page.getByTestId("SignIn").click(); // Locate an element by its `data-testid` attribute and click it
});

// A test to demonstrate locating child elements within a parent
test("Locating child elements", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click(); // Locate a specific text inside a nested structure and click it

  await page
    .locator("nb-card") // Locate the `nb-card` parent element
    .locator("nb-radio") // Then locate the `nb-radio` child element
    .locator(':text-is("Option 2")') // Then locate the text "Option 2"
    .click(); // Finally, click it

  await page
    .locator("nb-card") // Locate the `nb-card` parent element
    .getByRole("button", { name: "Sign in" }) // Find a button inside it by accessible name
    .first() // Get the first button if there are multiple matches
    .click(); // Click the button

  await page.locator("nb-card").nth(3).getByRole("button").click(); // Locate the fourth `nb-card` and click a button inside it
});

// A test to demonstrate locating parent elements
test("Locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" }) // Locate `nb-card` that contains the text "Using the Grid"
    .getByRole("textbox", { name: "Email" }) // Then locate a textbox with the accessible name "Email"
    .click(); // Click the textbox

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") }) // Locate `nb-card` that contains the element with ID `inputEmail1`
    .getByRole("textbox", { name: "Email" }) // Then locate a textbox with the accessible name "Email"
    .click(); // Click the textbox

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" }) // Locate `nb-card` with the text "Basic form"
    .getByRole("textbox", { name: "Email" }) // Then locate a textbox with the accessible name "Email"
    .click(); // Click the textbox

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") }) // Locate `nb-card` that contains an element with the class `.status-danger`
    .getByRole("textbox", { name: "Password" }) // Then locate a textbox with the accessible name "Password"
    .click(); // Click the textbox

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") }) // Locate `nb-card` that contains a `nb-checkbox` element
    .filter({ hasText: "Sign in" }) // Further narrow down to `nb-card` with the text "Sign in"
    .getByRole("textbox", { name: "Email" }) // Locate a textbox with the accessible name "Email"
    .click(); // Click the textbox

  await page
    .locator(':text-is("Using the Grid")') // Locate the element with the exact text "Using the Grid"
    .locator("..") // Move up to its parent element
    .getByRole("textbox", { name: "Email" }) // Locate a textbox with the accessible name "Email"
    .click(); // Click the textbox
});
