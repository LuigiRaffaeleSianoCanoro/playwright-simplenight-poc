import { Page } from '@playwright/test';

/**
 * Utility functions for test automation
 */
export class TestHelpers {
  /**
   * Wait for page to be fully loaded
   * @param page - Playwright page object
   * @param timeout - Timeout in milliseconds
   */
  static async waitForPageLoad(page: Page, timeout: number = 30000) {
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Take a screenshot with timestamp
   * @param page - Playwright page object
   * @param name - Screenshot name
   */
  static async takeScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Generate test data for different scenarios
   */
  static generateTestData() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    return {
      today: today.toISOString().split('T')[0],
      tomorrow: tomorrow.toISOString().split('T')[0],
      dayAfter: dayAfter.toISOString().split('T')[0],
    };
  }

  /**
   * Retry a function with exponential backoff
   * @param fn - Function to retry
   * @param maxRetries - Maximum number of retries
   * @param delay - Initial delay in milliseconds
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (i === maxRetries) {
          throw lastError;
        }
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
    
    throw lastError!;
  }

  /**
   * Wait for element to be visible and stable
   * @param page - Playwright page object
   * @param selector - Element selector
   * @param timeout - Timeout in milliseconds
   */
  static async waitForElementStable(
    page: Page,
    selector: string,
    timeout: number = 5000
  ) {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    // Wait a bit more to ensure element is stable
    await page.waitForTimeout(500);
  }

  /**
   * Clear all cookies and local storage
   * @param page - Playwright page object
   */
  static async clearBrowserData(page: Page) {
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Generate random test data
   */
  static generateRandomData() {
    return {
      randomString: Math.random().toString(36).substring(7),
      randomNumber: Math.floor(Math.random() * 1000),
      randomEmail: `test${Math.random().toString(36).substring(7)}@example.com`,
    };
  }
}
