const data = require('./data');
const seed = require('./seed');

const db = require('./');

const runSeed = async () => {
  await seed(data);
  await db.end();
};

runSeed();
