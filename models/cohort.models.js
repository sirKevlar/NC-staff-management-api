const db = require('../db');

exports.selectCohorts = () => {
  return db.query(`SELECT * FROM cohorts;`).then(({ rows }) => rows);
};

exports.insertNewCohort = ({
  cohort_name,
  status,
  type,
  student_count,
  start_date,
  end_date,
  percent_in_work,
}) => {
  return db
    .query(
      `
  INSERT INTO cohorts 
  (cohort_name, status, type, student_count, start_date, end_date, percent_in_work) 
  VALUES ($1, $2, $3, $4, $5, $6, $7) 
  RETURNING *;`,
      [
        cohort_name,
        status,
        type,
        student_count,
        start_date,
        end_date,
        percent_in_work,
      ]
    )
    .then(({ rows }) => rows[0]);
};

exports.selectCohortById = ({ cohort_name }) => {
  return db
    .query(`SELECT * FROM cohorts WHERE cohort_name = $1`, [cohort_name])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'id not found' });
      }
      return rows[0];
    });
};
