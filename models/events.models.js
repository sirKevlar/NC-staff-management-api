const db = require('../db');

exports.insertNewEvent = ({ employee_name, start_date, end_date, cohort }) => {
  return db
    .query(
      `
    INSERT INTO events 
    (employee_name, start_date, end_date, cohort) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;`,
      [employee_name, start_date, end_date, cohort]
    )
    .then(({ rows }) => rows[0]);
};
