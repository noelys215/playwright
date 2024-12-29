import { expect, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async selectCommonDatepickerDateFromTToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    );

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();

    const dateToAssertStart = await this.selectDateInTheCalendar(
      startDayFromToday
    );
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday);

    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("default", {
      month: "short",
    });
    const expectedMonthLong = date.toLocaleString("default", { month: "long" });
    const expectedYear = date.getFullYear().toString();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator("nb-calendar-pageable-navigation [data-name='chevron-right']")
        .click({ force: true });
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expectedDate, { exact: true })
      .click({ force: true });

    return dateToAssert;
  }
}
