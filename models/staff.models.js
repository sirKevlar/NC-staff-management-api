const db = require('../db');

exports.selectStaff = () => {
  return db.query(`SELECT * FROM staff`).then(({ rows }) => {
    return rows;
  });
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
  return db.query(
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
  ).then(({rows})=> rows)
};
