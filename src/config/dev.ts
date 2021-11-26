import { config } from 'dotenv';

config();

declare let process: {
  env: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
};

export const devConfig = {
  secrets: { jwt: process.env.JWT_SECRET },
  dbURL: process.env.DATABASE_URL,
};
