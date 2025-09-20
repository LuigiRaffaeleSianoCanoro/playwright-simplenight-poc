import { expect, test } from '@playwright/test';
import { PageFactory } from '../pages/page-factory';
import { hotelSearchData, priceRange } from '../fixtures/test-data';
import { GuestScore, ResultsLayoutOption, UrlParam } from '../fixtures/enum';

test('SC001 - Complete hotel booking flow for Miami with all requirements', async ({ page }) => {
  // Initialize page objects using PageFactory
  const homePage = PageFactory.createHomePage(page);
  const searchBar = PageFactory.createSearchBarPage(page);
  const hotelResults = PageFactory.createHotelResultsPage(page);

  // Step 1: Navigate to homepage and verify it loads
  await homePage.navigate();
  await homePage.verifyPageLoaded();

  // Step 2: Select Hotels category
  await searchBar.selectHotelCategory();

  // Step 3: Perform search with required parameters
  await searchBar.searchHotels(
    hotelSearchData.location,
    hotelSearchData.checkin,
    hotelSearchData.checkout,
    hotelSearchData.adults,
    hotelSearchData.children
  );

  // Step 4: Wait for results page to load and verify navigation
  await hotelResults.waitForResultsToLoad();
  await expect(page.url()).toContain(UrlParam.SEARCHPAGE);
  await hotelResults.verifyResultsDisplayed();

  // Step 5: Select Map view for search results
  await hotelResults.selectResultsLayout(ResultsLayoutOption.MAP);
  await expect(hotelResults.resultsLayoutTrigger).toContainText(ResultsLayoutOption.MAP, { ignoreCase: true });

  // Step 6: Apply filters on left panel
  await hotelResults.setPriceRange(priceRange.min, priceRange.max);
  await hotelResults.setGuestScore(GuestScore.VERY_GOOD);

  // Step 7: Zoom in the map view
  await hotelResults.zoomInMap(6);

  // Step 8: Select only 1 hotel option from the map
  await hotelResults.selectHotelOnMap();

  // Step 9: Verify hotel card meets filtered parameters
  await hotelResults.verifyHotelCardPrice(priceRange.min, priceRange.max);
  await hotelResults.verifyHotelCardGuestScore(GuestScore.VERY_GOOD);
});