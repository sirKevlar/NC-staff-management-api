const { location } = require('express/lib/response');
const db = require('../db');

exports.selectStudents = () => {
  let queryStr = `SELECT * FROM students`;

  return db.query(queryStr).then(({ rows }) => rows);
};
