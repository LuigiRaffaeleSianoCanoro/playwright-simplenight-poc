# Playwright Simplenight Test Automation Framework

A focused test automation framework built with Playwright and TypeScript to automate the hotel booking process for the Simplenight website. This framework implements a clean Page Object Model architecture with a single comprehensive test.

![Playwright](https://img.shields.io/badge/Playwright-1.55.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)

## 📋 Table of Contents
- [Architecture](#️-framework-architecture)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration-options)
- [Running Tests](#-running-tests)
- [Test Coverage](#-test-coverage)
- [Screenshots](#-screenshots)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)

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

- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: v7 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Modern Browser**: Chrome, Firefox, or Safari for headed mode testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LuigiRaffaeleSianoCanoro/playwright-simplenight-poc.git
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

### Environment Variables

```bash
# Set environment
export TEST_ENV=dev

# Set base URL
export BASE_URL=https://app.simplenight.com/

# Set browser
export BROWSER=chromium

# Set timeout
export TIMEOUT=30000
```

## 🧪 Running Tests

### ⚠️ Important: Headed Mode Configuration

**This framework is configured to run in headed mode by default for better reliability and debugging.** The tests are optimized for Chrome browser and work best when you can see the browser interactions.

### Basic Test Execution

```bash
# Run tests in headed mode with Chrome (recommended)
npm test

# Run tests in headed mode (explicit)
npm run test:headed

# Run tests with UI mode (interactive debugging)
npm run test:ui

# Debug tests step by step
npm run test:debug
```

### Browser-Specific Testing

```bash
# Chrome (recommended - most reliable)
npm run test:chrome

# Firefox
npm run test:firefox

# Safari/WebKit
npm run test:webkit

# Mobile Chrome
npm run test:mobile

# All browsers
npm run test:all
```

### Advanced Test Execution

```bash
# Run specific test file
npx playwright test tests/booking.spec.ts --project=chromium

# Run tests in headless mode
npx playwright test --headed=false --project=chromium

# Run tests in parallel
npx playwright test --workers=2 --project=chromium

# Run tests with custom timeout
npx playwright test --timeout=60000 --project=chromium
```

### Test Reports

```bash
# View HTML report
npm run test:report

# Generate JUnit report
npx playwright test --reporter=junit
```

## 📊 Test Coverage

### Main Test Scenario (`SC001`)

**Test ID**: `SC001 - Complete hotel booking flow for Miami with all requirements`

**Test Steps**:
1. ✅ **Homepage Navigation** - Verifies successful navigation to Simplenight
2. ✅ **Category Selection** - Tests hotel category selection
3. ✅ **Search Execution** - Performs search with Miami location, May 20-22 dates, 1 Adult + 1 Child
4. ✅ **Results Validation** - Verifies search results page loads correctly
5. ✅ **Map View Toggle** - Switches to map view for results
6. ✅ **Filter Application** - Applies price range (100-1000) and guest score (Very Good) filters
7. ✅ **Map Interaction** - Zooms in and selects a hotel from map
8. ✅ **Data Validation** - Verifies price and guest score meet filter criteria

**Coverage Areas**:
- ✅ UI Navigation
- ✅ Form Interactions
- ✅ Data Validation
- ✅ Map Functionality
- ✅ Filter Operations

## 📸 Screenshots

The framework automatically captures screenshots on test failures. Screenshots are saved in the `test-results/` directory with timestamps.

### Sample Test Flow
1. Homepage load verification
2. Hotel category selection
3. Search form completion
4. Results page with map view
5. Applied filters display
6. Selected hotel details

*Note: Screenshots are only captured on test failures by default. Use `--screenshot=always` to capture all screenshots.*

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

### Custom Test Data

Create custom test scenarios by modifying `fixtures/test-data.ts`:

```typescript
// Example: Different location and dates
export const customSearchData: HotelSearchData = {
  location: 'New York',
  checkin: '2024-06-15',
  checkout: '2024-06-18',
  dateValue: 'Jun 15 - Jun 18',
  adults: 2,
  children: 0
};
```

### Playwright Configuration

Customize `playwright.config.ts` for:
- Browser selection
- Parallel execution settings
- Timeout configurations
- Reporter settings
- Screenshot and video capture

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

## 🔧 Troubleshooting

### Common Issues

#### Headless Mode Problems
If you encounter issues when running tests in headless mode:
```bash
# Always use headed mode for this framework
npm test  # This runs in headed mode by default

# If you must run headless, use Chrome only
npx playwright test --headed=false --project=chromium
```

#### Browser Installation Issues
```bash
# If browsers fail to install
npm run test:install-deps
npx playwright install --with-deps
```

#### Test Timeout Issues
```bash
# Increase timeout for slow environments
npx playwright test --timeout=60000 --project=chromium
```

#### Dialog/Modal Issues
If tests fail due to dialogs or modals:
```bash
# Use headed mode to see what's happening
npm run test:headed

# Use debug mode to step through
npm run test:debug
```

#### Permission Issues (Windows)
```bash
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Network Issues
```bash
# Run with debug mode to see network requests
npx playwright test --debug --project=chromium
```

### Debug Mode
```bash
# Run tests with browser visible (default behavior)
npm test

# Run with Playwright UI for step-by-step debugging
npm run test:ui

# Debug specific test
npx playwright test tests/booking.spec.ts --debug --project=chromium
```

### Performance Tips
- Use `--workers=1` for debugging to avoid browser conflicts
- Use `--workers=2` for faster execution in headed mode
- Avoid running all browsers simultaneously in headed mode

### Test Reports
- **HTML Report**: `npm run test:report`
- **Screenshots**: Located in `test-results/`
- **Videos**: Located in `test-results/`
- **Traces**: Use Playwright Trace Viewer for detailed analysis

