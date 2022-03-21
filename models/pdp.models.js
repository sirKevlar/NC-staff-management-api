const db = require('../db');

exports.selectPdps = () => {
  return db.query(`SELECT * FROM pdps;`).then(({ rows }) => rows);
};