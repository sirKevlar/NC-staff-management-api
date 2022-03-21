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

exports.selectPdpById = ({ pdp_scheme }) => {
  return db
    .query(`SELECT * FROM pdps WHERE pdp_scheme = $1`, [pdp_scheme])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'id not found' });
      }
      return rows[0];
    });
};

exports.updatePdpById = ({ body, params: { pdp_scheme } }) => {
  const bodyKeyGreenList = ['pdp_scheme', 'details', 'duration_in_days', 'url'];
  if (!bodyKeyGreenList.includes(Object.keys(body)[0])) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }
  return db
    .query(
      `UPDATE pdps SET ${
        Object.keys(body)[0]
      } = $1 WHERE pdp_scheme = $2 RETURNING *`,
      [Object.values(body)[0], pdp_scheme]
    )
    .then(({ rows }) => rows[0]);
};
