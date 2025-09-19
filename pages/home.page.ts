import { Page } from '@playwright/test';
import config from '../config/test.config';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(config.baseURL);
  }
}