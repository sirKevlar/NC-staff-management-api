const { Pool } = require('pg');
const path = require('path')
const dotenv = require('dotenv')
const ENV = process.env.NODE_ENV || 'dev'

dotenv.config({
  path: path.resolve(__dirname, `../.env.${ENV}`)
})

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE & DATABASE_URL not set');
}

// PRODUCTION CONFIG - export pool with config as argument
// const config =
//   ENV === 'production'
//     ? {
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//           rejectUnauthorized: false,
//         },
//       }
//     : {};

module.exports = new Pool();