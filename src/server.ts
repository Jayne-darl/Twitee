import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import appConfig from './config';
import appRouter from './router';
import { connect } from './utils/db';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const app = express();
app.disable('x-powered-by');

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(appConfig.baseURL, appRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(appConfig.port, () => {
      console.log(`REST API on http://localhost:${appConfig.port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
