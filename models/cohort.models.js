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

exports.updateCohortById = ({ body, params: { cohort_name } }) => {
  const bodyKeyGreenList = [
    'cohort_name',
    'status',
    'type',
    'student_count',
    'start_date',
    'end_date',
    'percent_in_work',
  ];
  if (!bodyKeyGreenList.includes(Object.keys(body)[0])) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }
  return db
    .query(
      `UPDATE cohorts SET ${
        Object.keys(body)[0]
      } = $1 WHERE cohort_name = $2 RETURNING *`,
      [Object.values(body)[0], cohort_name]
    )
    .then(({ rows }) => rows[0]);
};
