import { Page, Locator, expect } from '@playwright/test';

export class SearchBarPage {
  readonly page: Page;
  readonly  hotelCategory: Locator;
  readonly  flightCategory: Locator;
  readonly  carRentalCategory: Locator;
  readonly  transportationCategory: Locator;
  readonly  thingsToDoCategory: Locator;
  readonly  showsAndEventsCategory: Locator;
  readonly  diningCategory: Locator;
  readonly  parkingCategory: Locator;
  readonly  hotelLocationInput: Locator;
  readonly  hotelLocationInputTrigger: Locator;
  readonly  hotelDateInput: Locator;
  readonly  hotelTravelersInput: Locator;
  readonly  searchButton: Locator;
  readonly  locationOptions: Locator;
  readonly  hotelDatePick: (year: number, month: number, day: number) => Locator;
  readonly  nextMonthButton: Locator;
  readonly  doneDatesButton: Locator;
  readonly  incrementAdultsButton: Locator;
  readonly  incrementChildrenButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hotelCategory = page.locator('[data-testid="category-search-bar-tab(static_hotels)"]');
        this.flightCategory = page.locator('[data-testid="category-search-bar-tab(static_flights)"]');
        this.carRentalCategory = page.locator('[data-testid="category-search-bar-tab(static_car-rental)"]');
        this.transportationCategory = page.locator('[data-testid="category-search-bar-tab(static_transportation)"]');
        this.thingsToDoCategory = page.locator('[data-testid="category-search-bar-tab(static_things-to-do)"]');
        this.showsAndEventsCategory = page.locator('[data-testid="category-search-bar-tab(static_shows-events)"]');
        this.diningCategory = page.locator('[data-testid="category-search-bar-tab(static_dining)"]');
        this.parkingCategory = page.locator('[data-testid="category-search-bar-tab(static_parking)"]');
        this.hotelLocationInputTrigger = page.locator('[data-testid="category(static_hotels)_search-form_location_trigger"]');
        this.hotelLocationInput = page.locator('[data-testid="category(static_hotels)_search-form_location_input"]');
        this.hotelDateInput = page.locator('[data-testid="category(static_hotels)_search-form_dates_trigger"]');
        this.hotelTravelersInput = page.locator('[data-testid="category(static_hotels)_search-form_guests_trigger"]');
        this.searchButton = page.locator('[data-testid="category(static_hotels)_search-form_search-button"]');
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
    }

    async selectHotelCategory() {
        await this.hotelCategory.click();
    }

    async selectFlightCategory() { 
        await this.flightCategory.click();
    }

    async selectCarRentalCategory() {
        await this.carRentalCategory.click();
    }

    async selectTransportationCategory() {
        await this.transportationCategory.click();
    }

    async selectThingsToDoCategory() {
        await this.thingsToDoCategory.click();
    }

    async selectShowsAndEventsCategory() {
        await this.showsAndEventsCategory.click();
    }

    async selectDiningCategory() {
        await this.diningCategory.click();
    }

    async selectParkingCategory() {
        await this.parkingCategory.click();
    }

    //TODO: improve the strategy for waiting for the dropdown to populate
    async selectHotelLocation(location: string) {
        await this.hotelLocationInputTrigger.click();
        await this.hotelLocationInput.fill(location);
        await this.page.waitForTimeout(3000); // wait for the dropdown to populate
        await this.locationOptions.first().click();
        await expect(this.hotelLocationInputTrigger).toHaveValue(location);
    }

    async selectHotelDates(checkIn: string, checkOut: string) {
        await this.hotelDateInput.click();
        const selectDay = async (date: string) => {
      const [year, month, day] = date.split('-').map(Number);

      let attempts = 0;
      const maxAttempts = 12;

      while (!(await this.hotelDatePick(year, month, day).isVisible())) {
        if (attempts >= maxAttempts) {
          throw new Error(`Date ${date} not found after ${maxAttempts} months navigation`);
        }
        await this.nextMonthButton.click();
        attempts++;
      }

      await this.hotelDatePick(year, month, day).click();
    };

    await selectDay(checkIn);
    await selectDay(checkOut);

    await this.doneDatesButton.click();
    }

    async selectHotelTravelers(adults: number, children: number) {
        await this.hotelTravelersInput.click();
        for (let i = 1; i < adults; i++) {
            await this.incrementAdultsButton.click();
        }
        for (let j = 0; j < children; j++) {
            await this.incrementChildrenButton.click();
        }
    }

    async searchHotels(location: string, checkIn: string, checkout: string, adults: number, children: number) {
        await this.selectHotelLocation(location);
        await this.selectHotelDates(checkIn, checkout);
        await this.selectHotelTravelers(adults, children);
        await this.searchButton.click();
    }
}