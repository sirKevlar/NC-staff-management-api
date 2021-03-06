const db = require('../db');

exports.selectStaff = (queries) => {
  const queryKeyGreenList = [
    'currentCohort',
    'role',
    'campus',
    'team',
    'pdp_scheme',
    'student',
    undefined,
  ];
  if (!queryKeyGreenList.includes(Object.keys(queries)[0])) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }
  
  let queryStr = `SELECT * FROM staff`;
  let queryInsert = [];

  if (queries.currentCohort) {
    queryInsert.push(queries.currentCohort);
    queryStr += ` LEFT JOIN events ON events.event_id = staff.event_id
      WHERE events.cohort = $1`;
  } else if (queries.role) {
    queryInsert.push(queries.role);
    queryStr += ` WHERE role = $1`;
  } else if (queries.campus) {
    queryInsert.push(queries.campus);
    queryStr += ` WHERE campus = $1`;
  } else if (queries.team) {
    queryInsert.push(queries.team);
    queryStr += ` WHERE team = $1`;
  } else if (queries.pdp_scheme) {
    queryInsert.push(queries.pdp_scheme);
    queryStr += ` WHERE pdp_scheme = $1`;
  } else if (queries.student) {
    queryInsert.push(queries.student);
    queryStr += ` LEFT JOIN events ON staff.employee_name = events.employee_name 
    LEFT JOIN students ON events.cohort = students.cohort_name 
    WHERE student_id = $1`;
  }
  return db.query(queryStr, queryInsert).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'filter value not found' });
    }
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
    .then(({ rows }) => rows[0]);
};

exports.selectStaffById = ({ staff_id }) => {
  return db
    .query(`SELECT * FROM staff WHERE staff_id = $1`, [staff_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'id not found' });
      }
      return rows[0];
    });
};

exports.updateStaffById = ({ body, params: { staff_id } }) => {
  const bodyKeyGreenList = [
    'employee_name',
    'role',
    'campus',
    'team',
    'start_date',
    'event_id',
    'holidays_left',
    'absences',
    'pdp_scheme',
    'computer_serial',
    'fob_serial',
    'notes',
  ];
  if (!bodyKeyGreenList.includes(Object.keys(body)[0])) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }
  return db
    .query(
      `UPDATE staff SET ${
        Object.keys(body)[0]
      } = $1 WHERE staff_id = $2 RETURNING *`,
      [Object.values(body)[0], staff_id]
    )
    .then(({ rows }) => rows[0]);
};

exports.removeStaffById = ({ staff_id }) => {
  return db
    .query(`DELETE FROM staff WHERE staff_id = $1 RETURNING *;`, [staff_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'id not found' });
      }
      return rows[0];
    });
};
