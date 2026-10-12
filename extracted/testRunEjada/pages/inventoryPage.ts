import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventory_items: Locator;
  readonly addToCart: Locator;
  readonly openCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventory_items = page.locator(".inventory_item");
    this.addToCart = page.getByRole("button", {
      name: "Add to cart",
    });
    this.openCart = page.locator('#shopping_cart_container');
  }

  async selectProduct(productName: string) {
    const product = this.inventory_items.filter({ hasText: productName });

    await expect(product).toBeVisible();

    await product
      .getByRole("button", {
        name: "Add to cart",
      })
      .click();
  }
}
