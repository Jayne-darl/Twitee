import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import appConfig from './config';

const app = express();
app.disable('x-powered-by');

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

export const start = async () => {
  try {
    app.listen(appConfig.port, () => {
      console.log(`REST API on http://localhost:${appConfig.port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
