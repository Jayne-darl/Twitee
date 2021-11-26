import { devConfig } from './dev';
import { prodConfig } from './prod';
import { testConfig } from './test';

declare let process: {
  env: {
    JWT_SECRET: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    PORT: number;
    JWT_EXP: string;
  };
};

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  baseURL: '/api/v1',
  port: process.env.PORT || 5000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    JWT_EXP: process.env.JWT_EXP,
  },
};

let envConfig = {
  ...devConfig,
  secrets: { ...devConfig.secrets, ...baseConfig.secrets },
};

switch (env) {
  case 'development':
    envConfig = {
      ...devConfig,
      secrets: { ...devConfig.secrets, ...baseConfig.secrets },
    };
    break;
  case 'test':
    envConfig = {
      ...testConfig,
      secrets: { ...testConfig.secrets, ...baseConfig.secrets },
    };
    break;
  case 'production':
    envConfig = {
      ...prodConfig,
      secrets: { ...prodConfig.secrets, ...baseConfig.secrets },
    };
    break;
  default:
    envConfig = {
      ...devConfig,
      secrets: { ...devConfig.secrets, ...baseConfig.secrets },
    };
}

const appConfig = { ...baseConfig, ...envConfig };

export default appConfig;
