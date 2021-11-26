import { Pool, QueryArrayConfig } from 'pg';
import { config } from 'dotenv';

config();

const databaseURL = process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL;

const credentials = {
  connectionString: databaseURL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(credentials);

// pool.on('error', (err, client) => {
//   console.error('Error:', err);
// });

pool.on('connect', () => console.log('Database is connected'));
pool.on('error', () => console.error('Database connection Error'));

// Connect with a connection pool.

/**
 * DB Query
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
exports.query = (text: QueryArrayConfig<any>, params: any): object => {
  return new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
