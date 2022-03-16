const data = require('./data');
const seed = require('./seed');

const db = require('./connection');

const runSeed = async () => {
  await seed(data);
  await db.end();
};

runSeed();