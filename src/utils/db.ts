import { config as dotenvConfig } from 'dotenv';
import { Sequelize } from 'sequelize';
import appConfig from '../config';
dotenvConfig();

// Option 1: Passing a connection URI
export const sequelize = new Sequelize(appConfig.dbURL); // Example for postgres

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Error(error);
  }
};
