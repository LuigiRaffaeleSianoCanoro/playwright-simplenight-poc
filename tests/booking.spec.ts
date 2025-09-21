import { test } from '@playwright/test';
import { PageFactory } from '../pages/page-factory';
import { hotelSearchData, priceRange } from '../fixtures/test-data';
import { GuestScore, ResultsLayoutOption } from '../fixtures/enum';

test('SC001 - Complete hotel booking flow for Miami with all requirements', async ({ page }) => {
  const homePage = PageFactory.createHomePage(page);
  const searchBar = PageFactory.createSearchBarPage(page);
  const hotelResults = PageFactory.createHotelResultsPage(page);

  await test.step('Navigate to homepage and verify it loads', async () => {
    await homePage.navigate();
    await homePage.verifyPageLoaded();
  });

  await test.step('Select Hotels category', async () => {
    await searchBar.selectHotelCategory();
  });

  await test.step('Perform search with required parameters', async () => {
    await searchBar.searchHotels(
      hotelSearchData.location,
      hotelSearchData.checkin,
      hotelSearchData.checkout,
      hotelSearchData.dateValue,
      hotelSearchData.adults,
      hotelSearchData.children
    );
  });

  await test.step('Wait for results page to load and verify URL', async () => {
    await hotelResults.waitForResultsPageToLoad();
  });

  await test.step('Select Map view for search results', async () => {
    await hotelResults.selectResultsLayout(ResultsLayoutOption.MAP);
  });

  await test.step('Apply filters on left panel', async () => {
    await hotelResults.setPriceRange(priceRange.min, priceRange.max);
    await hotelResults.setGuestScore(GuestScore.VERY_GOOD);
  });

  await test.step('Zoom in the map view', async () => {
    await hotelResults.zoomInMap(6);
  });

  await test.step('Select hotel option from the map', async () => {
    await hotelResults.selectHotelOnMap();
  });

  await test.step('Verify hotel card meets filtered parameters', async () => {
    await hotelResults.verifyHotelCardPrice(priceRange.min, priceRange.max);
    await hotelResults.verifyHotelCardGuestScore(GuestScore.VERY_GOOD);
  });
});