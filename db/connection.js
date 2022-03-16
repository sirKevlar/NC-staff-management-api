const { Pool } = require('pg');

const pool = new Client();

pool
  .connect()
  .then(() => {
    console.log(`connected to ${process.env.PGDATABASE}!`);
  })
  .catch((err) => {
    console.log('connection error:', err);
  });