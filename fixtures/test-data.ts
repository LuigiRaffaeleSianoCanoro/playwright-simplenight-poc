// Test data interfaces for type safety
export interface HotelSearchData {
  location: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface TestEnvironment {
  name: string;
  baseURL: string;
  timeout: number;
}

// Test data for the challenge requirements
export const hotelSearchData: HotelSearchData = {
  location: 'Miami',
  checkin: '2026-05-20',
  checkout: '2026-05-22',
  adults: 1,
  children: 1
};

// Price range for filtering
export const priceRange: PriceRange = {
  min: 100,
  max: 1000
};

// Environment configurations
export const environments: Record<string, TestEnvironment> = {
  dev: {
    name: 'Development',
    baseURL: 'https://app.simplenight.com/',
    timeout: 30000
  }
};
