import { test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datePickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:4200");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

test("parameterized methods", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);
  const onDatepickerPage = new DatepickerPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormUsingCredentialsAndSelectOption(
    "test@test.com",
    "Welcome1",
    "Option 1"
  );

  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    "John Smith",
    "john@test.com",
    true
  );

  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatepickerDateFromTToday(7);
  await onDatepickerPage.selectDatepickerWithRangeFromToday(6, 15);
});
