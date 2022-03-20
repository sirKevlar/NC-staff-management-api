const { location } = require('express/lib/response');
const db = require('../db');

exports.selectStudents = ({ cohort }) => {
  let queryStr = `SELECT * FROM students`;

  if (cohort) queryStr += ` WHERE cohort_name = $1`;

  return db.query(queryStr, [cohort]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'filter value not found' });
    }
    return rows;
  });
};

exports.insertNewStudent = ({ student_name, cohort_name, notes }) => {
  return db
    .query(
      `
    INSERT INTO students 
    (student_name, cohort_name, notes) 
    VALUES ($1, $2, $3) 
    RETURNING *;`,
      [student_name, cohort_name, notes]
    )
    .then(({ rows }) => rows[0]);
};

exports.selectStudentById = ({ student_id }) => {
  return db
    .query(`SELECT * FROM students WHERE student_id = $1`, [student_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'id not found' });
      }
      return rows[0];
    });
};

exports.updateStudentById = ({ body, params: { student_id } }) => {
  const bodyKeyGreenList = ['student_name', 'cohort_name', 'notes'];

  if (!bodyKeyGreenList.includes(Object.keys(body)[0])) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }
  return db
    .query(
      `UPDATE students SET ${
        Object.keys(body)[0]
      } = $1 WHERE student_id = $2 RETURNING *;`,
      [Object.values(body)[0], student_id]
    )
    .then(({ rows }) => rows[0])
};
