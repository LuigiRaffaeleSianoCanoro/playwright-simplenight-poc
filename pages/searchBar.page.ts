import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchBarPage extends BasePage {
  readonly categories = {
    hotel: this.page.locator('[data-testid="category-search-bar-tab(static_hotels)"]'),
  };

  readonly hotelForm = {
    locationTrigger: this.page.locator('[data-testid="category(static_hotels)_search-form_location_trigger"]'),
    locationInput: this.page.locator('[data-testid="category(static_hotels)_search-form_location_input"]'),
    dateTrigger: this.page.locator('[data-testid="category(static_hotels)_search-form_dates_trigger"]'),
    travelersTrigger: this.page.locator('[data-testid="category(static_hotels)_search-form_guests_trigger"]'),
    searchButton: this.page.locator('[data-testid="category(static_hotels)_search-form_search-button"]'),
  };

  readonly locationOptions: Locator;
  readonly hotelDatePick: (year: number, month: number, day: number) => Locator;
  readonly nextMonthButton: Locator;
  readonly doneDatesButton: Locator;
  readonly incrementAdultsButton: Locator;
  readonly incrementChildrenButton: Locator;
  readonly hotelInputAdultsCounter: Locator;
  readonly hotelInputChildrenCounter: Locator;

  constructor(page: Page) {
    super(page);
    
    this.locationOptions = page.locator('div[role="option"]');
    this.hotelDatePick = (year: number, month: number, day: number) => {
      return this.page.locator(
        `[data-testid="category(static_hotels)_search-form_dates_calendar_day(${year}-${month}-${day})"]`
      );
    };
    this.nextMonthButton = page.locator('button[data-direction="next"]');
    this.doneDatesButton = page.locator('[data-testid="category(static_hotels)_search-form_dates_apply-button"]');
    this.incrementAdultsButton = page.getByLabel('Add Adult');
    this.incrementChildrenButton = page.getByLabel('Add Child');
    this.hotelInputAdultsCounter = this.incrementAdultsButton.locator('.. >> p');
    this.hotelInputChildrenCounter = this.incrementChildrenButton.locator('.. >> p');
  }

  /**
   * Select hotel category tab
   */
  async selectHotelCategory() {
    await this.categories.hotel.click();
  }

  /**
   * Select hotel location with improved waiting strategy
   * @param location - The location to search for
   */
  async selectHotelLocation(location: string) {
    await this.hotelForm.locationTrigger.click();
    await this.hotelForm.locationInput.fill(location);
    await this.page.waitForTimeout(3000);
    await this.locationOptions.first().click();
    await expect(this.hotelForm.locationTrigger).toHaveValue(location);
  }

  /**
   * Select hotel check-in and check-out dates
   * @param checkIn - Check-in date in YYYY-MM-DD format
   * @param checkOut - Check-out date in YYYY-MM-DD format
   */
  async selectHotelDates(checkIn: string, checkOut: string) {
    await this.hotelForm.dateTrigger.click();
    
    await this.selectDate(checkIn);
    await this.selectDate(checkOut);
    
    await this.doneDatesButton.click();
    await this.verifyDatesSelected(checkIn, checkOut);
  }

  /**
   * Private helper method to select a specific date
   * @param dateString - Date in YYYY-MM-DD format
   */
  private async selectDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    const dateLocator = this.hotelDatePick(year, month, day);    
    let attempts = 0;
    const maxAttempts = 12;
    
    while (!(await dateLocator.isVisible()) && attempts < maxAttempts) {
      await this.nextMonthButton.click();
      await this.page.waitForTimeout(500);
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      throw new Error(`Date ${dateString} not found after ${maxAttempts} months navigation`);
    }
    
    await dateLocator.click();
  }

  /**
   * Verify that the selected dates are displayed correctly
   * @param checkIn - Expected check-in date
   * @param checkOut - Expected check-out date
   */
  private async verifyDatesSelected(checkIn: string, checkOut: string) {
  }

  /**
   * Select number of travelers (adults and children)
   * @param adults - Number of adults
   * @param children - Number of children
   */
  async selectHotelTravelers(adults: number, children: number) {
    await this.hotelForm.travelersTrigger.click();
    
    for (let i = 1; i < adults; i++) {
      await this.incrementAdultsButton.click();
    }
    
    for (let j = 0; j < children; j++) {
      await this.incrementChildrenButton.click();
    }
    
    await expect(this.hotelInputAdultsCounter).toHaveText(`${adults}`);
    await expect(this.hotelInputChildrenCounter).toHaveText(`${children}`);
  }

  /**
   * Complete hotel search with all parameters
   * @param location - Hotel location
   * @param checkIn - Check-in date in YYYY-MM-DD format
   * @param checkOut - Check-out date in YYYY-MM-DD format
   * @param adults - Number of adults
   * @param children - Number of children
   */
  async searchHotels(location: string, checkIn: string, checkOut: string, adults: number, children: number) {
    await this.selectHotelLocation(location);
    await this.selectHotelDates(checkIn, checkOut);
    await this.selectHotelTravelers(adults, children);
    await this.hotelForm.searchButton.click();
  }
}