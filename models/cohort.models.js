const db = require('../db');

exports.selectCohorts = () => {
  let queryStr = `SELECT * FROM cohorts;`;

  return db.query(queryStr).then(({ rows }) => rows);
};
