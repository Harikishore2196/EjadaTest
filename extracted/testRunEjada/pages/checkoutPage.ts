import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continue: Locator
  readonly finishOrderBtn: Locator
  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.postalCode = page.locator("#postal-code");
    this.continue = page.locator(`#continue`);
    this.finishOrderBtn = page.locator(`#finish`);
  }

  async enterCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);

    await this.continue.click();
  }

  async verifyOrderConfirmation() {
    await expect(this.page.locator(".complete-header")).toHaveText(
      "Thank you for your order!",
    );
  }
}
