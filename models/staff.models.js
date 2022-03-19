const db = require('../db');

exports.selectStaff = ({
  currentCohort,
  role,
  campus,
  team,
  pdp_scheme,
  student,
}) => {
  let queryStr = `SELECT * FROM staff`;
  let queryInsert;

  if (currentCohort) {
    queryInsert = currentCohort;
    queryStr += ` LEFT JOIN events ON events.event_id = staff.event_id
      WHERE events.cohort = $1`;
  } else if (role) {
    queryInsert = role;
    queryStr += ` WHERE role = $1`;
  } else if (campus) {
    queryInsert = campus;
    queryStr += ` WHERE campus = $1`;
  } else if (team) {
    queryInsert = team;
    queryStr += ` WHERE team = $1`;
  } else if (pdp_scheme) {
    queryInsert = pdp_scheme;
    queryStr += ` WHERE pdp_scheme = $1`;
  } else if (student) {
    queryInsert = student;
    queryStr += ` LEFT JOIN events ON events.event_id = staff.event_id 
    LEFT JOIN students ON events.cohort = students.cohort_name 
    WHERE student_id = $1`;
  }
  return db
    .query(queryStr, [queryInsert])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'filter value not found' });
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
