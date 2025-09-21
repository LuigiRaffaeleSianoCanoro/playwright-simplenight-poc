/**
 * Global type definitions for the test automation framework
 */

// Test execution environment
export type TestEnvironment = 'dev' | 'staging' | 'prod';

// Browser types supported by Playwright
export type BrowserType = 'chromium' | 'firefox' | 'webkit';

// Test execution modes
export type TestMode = 'headed' | 'headless' | 'debug' | 'ui';

// Search categories available in the application
export type SearchCategory = 
  | 'hotels' 
  | 'flights' 
  | 'car-rental' 
  | 'transportation' 
  | 'things-to-do' 
  | 'shows-events' 
  | 'dining' 
  | 'parking';

// Guest score levels
export type GuestScoreLevel = 'Excellent' | 'Very Good' | 'Good' | 'Average' | 'All';

// Results layout options
export type ResultsLayout = 'grid' | 'list' | 'map';

// Test data interfaces
export interface BaseSearchData {

}

export interface HotelSearchData extends BaseSearchData {
  location: string;
  checkin: string;
  checkout: string;
  dateValue: string;
  adults: number;
  children: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface TestConfiguration {
  baseURL: string;
  timeout: number;
  retries: number;
  workers: number;
  browser: BrowserType;
  mode: TestMode;
}

export interface TestResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  screenshot?: string;
  video?: string;
}

// Page object method return types
export interface PageActionResult {
  success: boolean;
  message?: string;
  data?: any;
}

// Test suite configuration
export interface TestSuiteConfig {
  name: string;
  description: string;
  timeout: number;
  retries: number;
  parallel: boolean;
  browsers: BrowserType[];
}

// Environment configuration
export interface EnvironmentConfig {
  name: string;
  baseURL: string;
  timeout: number;
  apiEndpoint?: string;
  credentials?: {
    username: string;
    password: string;
  };
}

// Test data validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Element interaction types
export interface ElementInteraction {
  type: 'click' | 'fill' | 'select' | 'hover' | 'scroll';
  selector: string;
  value?: string;
  options?: any;
}

// Test execution context
export interface TestContext {
  environment: TestEnvironment;
  browser: BrowserType;
  mode: TestMode;
  startTime: Date;
  endTime?: Date;
  testData: any;
}
