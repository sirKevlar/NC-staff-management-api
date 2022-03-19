const db = require('../db');

exports.selectStaff = ({ currentCohort }) => {
  let queryStr = `SELECT * FROM staff`;

  if (currentCohort) {
    queryStr += ` LEFT JOIN events ON events.event_id = staff.event_id
      WHERE events.cohort = $1`;
  }
  return db
    .query(queryStr, [currentCohort])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'cohort not found' });
      }
      return rows;
    })
};

exports.insertNewStaff = ({
  employee_name,
  role,
  campus,
  team,
  start_date,
  event_id,
  holidays_left,
  absences,
  pdp_scheme,
  computer_serial,
  fob_serial,
  notes,
}) => {
  return db
    .query(
      `
  INSERT INTO staff
  (employee_name, role, campus, team, start_date, event_id, holidays_left, absences, pdp_scheme, computer_serial, fob_serial, notes)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING *;`,
      [
        employee_name,
        role,
        campus,
        team,
        start_date,
        event_id,
        holidays_left,
        absences,
        pdp_scheme,
        computer_serial,
        fob_serial,
        notes,
      ]
    )
    .then(({ rows }) => rows);
};
