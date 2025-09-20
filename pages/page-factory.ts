import { Page } from '@playwright/test';
import { HomePage } from './home.page';
import { SearchBarPage } from './searchBar.page';
import { HotelResultsPage } from './hotelResults.page';

/**
 * Factory class for creating page objects
 * Provides a centralized way to instantiate page objects with consistent configuration
 */
export class PageFactory {
  /**
   * Create a HomePage instance
   * @param page - Playwright Page object
   * @returns HomePage instance
   */
  static createHomePage(page: Page): HomePage {
    return new HomePage(page);
  }

  /**
   * Create a SearchBarPage instance
   * @param page - Playwright Page object
   * @returns SearchBarPage instance
   */
  static createSearchBarPage(page: Page): SearchBarPage {
    return new SearchBarPage(page);
  }

  /**
   * Create a HotelResultsPage instance
   * @param page - Playwright Page object
   * @returns HotelResultsPage instance
   */
  static createHotelResultsPage(page: Page): HotelResultsPage {
    return new HotelResultsPage(page);
  }

  /**
   * Create all page objects for a given page
   * Useful when you need access to multiple page objects
   * @param page - Playwright Page object
   * @returns Object containing all page instances
   */
  static createAllPages(page: Page) {
    return {
      home: this.createHomePage(page),
      searchBar: this.createSearchBarPage(page),
      hotelResults: this.createHotelResultsPage(page),
    };
  }
}
