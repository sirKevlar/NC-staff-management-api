const db = require('../db');

exports.selectStaff = () => {
  return db.query(`SELECT * FROM staff`).then(({ rows }) => {
    return rows;
  });
};
