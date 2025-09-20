import { Page, expect } from '@playwright/test';
import config from '../config/test.config';
import { BasePage } from './base.page';
import { SearchBarPage } from './searchBar.page';

export class HomePage extends BasePage {
  readonly searchBar: SearchBarPage;

  constructor(page: Page) {
    super(page);
    this.searchBar = new SearchBarPage(page);
  }

  /**
   * Navigate to the home page and wait for it to load
   */
  async navigate() {
    await this.page.goto(config.baseURL);
    await this.waitForPageLoad();
  }

  /**
   * Wait for the home page to be fully loaded
   */
  async waitForPageLoad() {
    await super.waitForPageLoad();
    await this.page.waitForSelector('[data-testid*="search-bar"]');
    await this.searchBar.categories.hotel.waitFor({ state: 'visible' });
  }

  /**
   * Verify that the home page has loaded correctly
   */
  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/Simplenight/);
    await expect(this.searchBar.categories.hotel).toBeVisible();
    await expect(this.searchBar.hotelForm.searchButton).toBeVisible();
  }

  /**
   * Get the search bar page instance for chaining
   */
  getSearchBar(): SearchBarPage {
    return this.searchBar;
  }
}