const { location } = require('express/lib/response');
const db = require('../db');

exports.selectStudents = () => {
  let queryStr = `SELECT * FROM students`;

  return db.query(queryStr).then(({ rows }) => rows);
};

exports.insertNewStudent = ({
  student_name,
  cohort_name,
  notes,
}) => {
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
