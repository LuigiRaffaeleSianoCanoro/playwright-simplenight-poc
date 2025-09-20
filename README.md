# Playwright Simplenight Test Automation Framework

A focused test automation framework built with Playwright and TypeScript to automate the hotel booking process for the Simplenight website. This framework implements a clean Page Object Model architecture with a single comprehensive test.

## 🏗️ Framework Architecture

```
├── config/                 # Environment configurations
│   └── test.config.ts     # Environment-specific settings
├── fixtures/              # Test data and enums
│   ├── enum.ts           # Application enums
│   └── test-data.ts      # Test data with TypeScript interfaces
├── pages/                 # Page Object Model
│   ├── base.page.ts      # Base page with common functionality
│   ├── home.page.ts      # Homepage object
│   ├── searchBar.page.ts # Search functionality
│   ├── hotelResults.page.ts # Hotel results page
│   └── page-factory.ts   # Page object factory
├── tests/                 # Test specifications
│   └── booking.spec.ts   # Single comprehensive test
├── test-results/          # Test execution results
├── playwright.config.ts   # Playwright configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright-simplenight-poc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run test:install
   ```

### Configuration

The framework supports multiple environments. Configure your environment by setting the `TEST_ENV` variable:

```bash
# Development (default)
export TEST_ENV=dev
```

## 🧪 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Debug tests
npm run test:debug
```

### Advanced Test Execution

```bash
# Run specific test file
npx playwright test tests/booking.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests in parallel
npx playwright test --workers=4

# Run tests with custom timeout
npx playwright test --timeout=60000
```

### Test Reports

```bash
# View HTML report
npm run test:report

# Generate JUnit report
npx playwright test --reporter=junit
```

## 📊 Test Coverage

The framework includes a single comprehensive test that covers all requirements:

### Main Test (`SC001 - Complete hotel booking flow for Miami with all requirements`)
- **Homepage Navigation**: Verifies successful navigation to Simplenight
- **Hotel Category Selection**: Tests hotel category selection
- **Search Execution**: Performs search with Miami location, May 20-22 dates, 1 Adult + 1 Child
- **Map View**: Switches to map view for results
- **Filtering**: Applies price range (100-1000) and guest score (Very Good) filters
- **Map Interaction**: Zooms in and selects a hotel
- **Validation**: Verifies price and guest score meet filter criteria

## 🔧 Configuration Options

### Environment Configuration

Edit `config/test.config.ts` to add new environments:

```typescript
const configs: Record<string, EnvConfig> = {
  dev: {
    baseURL: 'https://app.simplenight.com/',
  }
};
```

### Test Data Configuration

Modify `fixtures/test-data.ts` to update test parameters:

```typescript
export const hotelSearchData: HotelSearchData = {
  location: 'Miami',
  checkin: '2024-05-20',
  checkout: '2024-05-22',
  adults: 1,
  children: 1
};

export const priceRange: PriceRange = {
  min: 100,
  max: 1000
};
```

### Playwright Configuration

Customize `playwright.config.ts` for:
- Browser selection
- Parallel execution settings
- Timeout configurations
- Reporter settings
- Screenshot and video capture

## 🛠️ Development

### Current Test Structure

The framework uses a single comprehensive test that covers all challenge requirements:

```typescript
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
```

## 📝 Best Practices

### Page Object Model
- Each page has its own class with relevant methods
- Locators are defined as readonly properties
- Methods are focused on single responsibilities
- Use composition for related functionality

### Test Data Management
- All test data is externalized in `fixtures/test-data.ts`
- Use TypeScript interfaces for type safety
- Group related data together
- Support multiple environments

### Error Handling
- Implement retry logic for flaky operations
- Provide meaningful error messages
- Take screenshots on failures

### Code Organization
- Follow consistent naming conventions
- Use JSDoc for method documentation

### Monitoring

- HTML reports show execution times
- Screenshots capture failure points
- Video recordings available for debugging
- Trace files for detailed analysis

