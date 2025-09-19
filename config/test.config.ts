interface EnvConfig {
  baseURL: string;
}

const configs: Record<string, EnvConfig> = {
  dev: {
    baseURL: 'https://app.simplenight.com/',
  }
};

// Default to `dev` if ENV not set
const env = process.env.TEST_ENV || 'dev';
const config = configs[env];

export default config;
