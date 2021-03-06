const db = require('./');

const createTables = async () => {
  const cohortTable = db.query(`
    CREATE TABLE cohorts ( 
        cohort_name VARCHAR PRIMARY KEY,
        status VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        student_count INT NOT NULL,
        start_date VARCHAR NOT NULL,
        end_date VARCHAR NOT NULL,
        percent_in_work INT NOT NULL
    );`);

  const pdpTable = db.query(`
  CREATE TABLE pdps (
      pdp_scheme VARCHAR NOT NULL PRIMARY KEY,
      details VARCHAR NOT NULL,
      duration_in_days INT NOT NULL,
      url VARCHAR NOT NULL
  );`);

  await Promise.all([cohortTable, pdpTable]);

  await db.query(`
  CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    employee_name VARCHAR NOT NULL, 
    start_date VARCHAR NOT NULL,
    end_date VARCHAR NOT NULL,
    cohort VARCHAR REFERENCES cohorts(cohort_name) NOT NULL
  );`);

  // await db.query(`
  // CREATE TABLE  seminar_groups (
  //     seminar_group_name VARCHAR PRIMARY KEY,
  //     cohort_name VARCHAR NOT NULL REFERENCES cohorts(cohort_name)
  // );`);

  // await db.query(`
  // CREATE TABLE mentor_groups (
  //     mentor_group_name VARCHAR PRIMARY KEY,
  //     cohort_name VARCHAR NOT NULL REFERENCES cohorts(cohort_name),
  //     seminar_group_name VARCHAR NOT NULL REFERENCES seminar_groups(seminar_group_name)
  // );`);

  // the above has been temporarily removed

  const staffTable = db.query(`
  CREATE TABLE staff (
      staff_id SERIAL PRIMARY KEY,
      employee_name VARCHAR NOT NULL,
      role VARCHAR NOT NULL,
      campus VARCHAR NOT NULL,
      team VARCHAR NOT NULL,
      start_date VARCHAR NOT NULL,
      event_id INT REFERENCES events(event_id),
      holidays_left INT NOT NULL,
      absences INT NOT NULL,
      pdp_scheme VARCHAR REFERENCES pdps(pdp_scheme),
      computer_serial VARCHAR,
      fob_serial VARCHAR,
      notes VARCHAR
  );`);

  const studentTable = db.query(`
  CREATE TABLE students (
      student_id SERIAL PRIMARY KEY,
      student_name VARCHAR NOT NULL,
      cohort_name VARCHAR REFERENCES cohorts(cohort_name),
      github VARCHAR,
      email VARCHAR,
      notes VARCHAR
  );`);

  await Promise.all([staffTable, studentTable]);
};

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS students;`);
  await db.query(`DROP TABLE IF EXISTS staff;`);
  await db.query(`DROP TABLE IF EXISTS events;`);
  // await db.query(`DROP TABLE IF EXISTS mentor_groups;`);
  // await db.query(`DROP TABLE IF EXISTS seminar_groups;`);
  await db.query(`DROP TABLE IF EXISTS pdps;`);
  await db.query(`DROP TABLE IF EXISTS cohorts;`);
};

module.exports = { createTables, dropTables };
