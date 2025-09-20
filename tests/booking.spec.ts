import { expect, test } from '@playwright/test';
import { SearchBarPage } from '../pages/searchBar.page';
import { hotelSearchData } from '../fixtures/test-data';
import { HomePage } from '../pages/home.page';

let searchBarPage: SearchBarPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    searchBarPage = new SearchBarPage(page);
    homePage = new HomePage(page);
});
//TODO: improve waiting mechanism and improve assertions
test('SC001 - Booking flow - Hotels in Miami', async ({ page }) => {
    
    await homePage.navigate();
    await searchBarPage.selectHotelCategory();
    await searchBarPage.searchHotels(
        hotelSearchData.location, 
        hotelSearchData.checkin,
        hotelSearchData.checkout, 
        hotelSearchData.adults, 
        hotelSearchData.children);
    await page.waitForTimeout(5000); // wait for navigation to complete
    await expect(page.url()).toContain('/search/hotels');    
});