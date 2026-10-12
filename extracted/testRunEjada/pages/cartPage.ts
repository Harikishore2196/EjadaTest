import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly inventory_item_name: Locator;
  readonly checkout: Locator;
  constructor(page: Page) {
    this.page = page;
    this.inventory_item_name = page.locator(
      `//div[@class='inventory_item_name']`,
    );
    this.checkout = page.locator('#checkout');
  }
}
