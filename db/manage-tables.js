const db = require('./');

const createTables = async () => {
  const cohortTable = db.query(`
    CREATE TABLE cohorts ( 
        cohort_name VARCHAR PRIMARY KEY,
        status VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        number_of_students INT NOT NULL,
        start_date VARCHAR NOT NULL,
        end_date VARCHAR NOT NULL,
        percent_in_work INT NOT NULL
    );`);

  const pdpTable = db.query(`
  CREATE TABLE pdp (
      pdp_id SERIAL PRIMARY KEY,
      pdp_name VARCHAR NOT NULL,
      details VARCHAR NOT NULL,
      duration_in_days INT NOT NULL,
      url VARCHAR NOT NULL
  );`);

  await Promise.all([cohortTable, pdpTable]);

  await db.query(`
  CREATE TABLE  seminar_groups (
      seminar_group_name VARCHAR PRIMARY KEY,
      cohort VARCHAR NOT NULL REFERENCES cohorts(cohort_name),
  );`);

  await db.query(`
  CREATE TABLE mentor_groups (
      mentor_group_name VARCHAR PRIMARY KEY,
      cohort VARCHAR NOT NULL REFERENCES cohorts(cohort_name),
      seminar_group VARCHAR NOT NULL REFERENCES seminar_groups(seminar_group_name)
  );`);

  const staffTable = db.query(`
  CREATE TABLE staff (
      staff_id SERIAL PRIMARY KEY,
      staff_name VARCHAR NOT NULL,
      role VARCHAR NOT NULL,
      location VARCHAR NOT NULL,
      team VARCHAR NOT NULL,
      start_date VARCHAR NOT NULL,
      cohort VARCHAR REFERENCES cohorts(cohort_name),
      seminar VARCHAR REFERENCES seminar_groups(seminar_group_name),
      mentor VARCHAR REFERENCES mentor_groups(mentor_group_name),
      holidays_left INT NOT NULL,
      absences INT NOT NULL,
      pdp_scheme VARCHAR REFERENCES pdp(pdp_name)
      computer_serial VARCHAR,
      fob_serial VARCHAR
  );`);

  const studentTable = db.query(`
  CREATE TABLE students (
      student_id SERIAL PRIMARY KEY,
      student_name VARCHAR NOT NULL,
      cohort VARCHAR REFERENCES cohorts(cohort_name),
      seminar VARCHAR REFERENCES seminar_groups(seminar_group_name),
      mentor VARCHAR REFERENCES mentor_groups(mentor_group_name),
      github VARCHAR,
      email VARCHAR
  );`);

  await Promise.all([staffTable, studentTable]);
};

const dropTables = async () => {
    await db.query(`DROP TABLE IF EXISTS students;`)
    await db.query(`DROP TABLE IF EXISTS staff;`)
    await db.query(`DROP TABLE IF EXISTS mentor_groups;`)
    await db.query(`DROP TABLE IF EXISTS seminar_groups;`)
    await db.query(`DROP TABLE IF EXISTS pdp;`)
    await db.query(`DROP TABLE IF EXISTS cohorts;`)
}
