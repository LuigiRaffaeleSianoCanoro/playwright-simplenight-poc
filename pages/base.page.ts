import { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Common page load logic that can be overridden by subclasses
   */
  async waitForPageLoad() {
    // Wait for the page to be fully loaded
    await this.page.waitForLoadState('domcontentloaded');
  }


  /**
   * Wait for a specific element to be visible
   * @param selector - CSS selector or test id
   * @param timeout - Timeout in milliseconds
   */
  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Get the current page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
