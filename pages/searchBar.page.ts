import { Page, Locator } from '@playwright/test';

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
  readonly  hotelDateInput: Locator;
  readonly  hotelTravelersInput: Locator;
  readonly  searchButton: Locator;

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
        this.hotelLocationInput = page.locator('[data-testid="category(static_hotels)_search-form_location_trigger"]');
        this.hotelDateInput = page.locator('[data-testid="category(static_hotels)_search-form_dates_trigger"]');
        this.hotelTravelersInput = page.locator('[data-testid="category(static_hotels)_search-form_guests_trigger"]');
        this.searchButton = page.locator('[data-testid="category(static_hotels)_search-form_search-button"]');
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

    async searchHotels(location: string, dates: string, travelers: string) {
        await this.hotelLocationInput.fill(location);
        await this.hotelDateInput.fill(dates);
        await this.hotelTravelersInput.fill(travelers);
        await this.searchButton.click();
    }
}