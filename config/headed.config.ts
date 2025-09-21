/**
 * Configuration for headed vs headless mode testing
 * This file allows easy switching between modes
 */

export interface HeadedConfig {
  headless: boolean;
  workers: number;
  defaultProject: string;
  launchOptions: {
    args: string[];
  };
}

// Default configuration - headed mode for better reliability
export const headedConfig: HeadedConfig = {
  headless: false,
  workers: 1, // Single worker for headed mode to avoid conflicts
  defaultProject: 'chromium',
  launchOptions: {
    args: ['--start-maximized', '--disable-web-security']
  }
};

// Alternative configuration for headless mode (not recommended)
export const headlessConfig: HeadedConfig = {
  headless: true,
  workers: 4, // Multiple workers for headless mode
  defaultProject: 'chromium',
  launchOptions: {
    args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
  }
};

// Get configuration based on environment variable
export function getHeadedConfig(): HeadedConfig {
  const mode = process.env.TEST_MODE || 'headed';
  return mode === 'headless' ? headlessConfig : headedConfig;
}
