const db = require('../db');

exports.selectPdps = () => {
  return db.query(`SELECT * FROM pdps;`).then(({ rows }) => rows);
};

exports.insertNewPdp = ({ pdp_scheme, details, duration_in_days, url }) => {
  return db
    .query(
      `
    INSERT INTO pdps 
    (pdp_scheme, details, duration_in_days, url) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;`,
      [pdp_scheme, details, duration_in_days, url]
    )
    .then(({ rows }) => rows[0]);
};
