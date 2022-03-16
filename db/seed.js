const format = require('pg-format');
const db = require('./');
const { dropTables, createTables } = require('./manage-tables');

const seed = async ({
  cohortData,
  mentorGroupData,
  pdpData,
  seminarGroupData,
  staffData,
  studentData,
}) => {
  await dropTables();
  await createTables();

  const insertCohorts = format(
    `INSERT INTO cohorts
        (cohort_name, status, type, student_count, start_date, end_date, percent_in_work) 
        VALUES %L RETURNING *;`,
    cohortData.map(
      ({
        cohort_name,
        status,
        type,
        student_count,
        start_date,
        end_date,
        percent_in_work,
      }) => [
        cohort_name,
        status,
        type,
        student_count,
        start_date,
        end_date,
        percent_in_work,
      ]
    )
  );
  const cohorts = db
    .query(insertCohorts)
    .then(({ rows }) => rows)
    .catch(console.log);

  const insertPdps = format(
    `INSERT INTO pdps 
      (pdp_scheme, details, duration_in_days, url) 
      VALUES %L RETURNING*;`,
    pdpData.map(({ pdp_scheme, details, duration_in_days, url }) => [
      pdp_scheme,
      details,
      duration_in_days,
      url,
    ])
  );
  const pdps = db
    .query(insertPdps)
    .then(({ rows }) => rows)
    .catch(console.log);

  await Promise.all([cohorts, pdps]);

  const insertSeminarGroups = format(
    `INSERT INTO seminar_groups 
      (seminar_group_name, cohort_name) 
      VALUES %L RETURNING*;`,
    seminarGroupData.map(({ seminar_group_name, cohort_name }) => [
      seminar_group_name,
      cohort_name,
    ])
  );
  const seminarGroups = await db
    .query(insertSeminarGroups)
    .then(({ rows }) => rows)
    .catch(console.log);

  const insertMentorGroups = format(
    `INSERT INTO mentor_groups 
      (mentor_group_name, cohort_name, seminar_group_name) 
      VALUES %L RETURNING*;`,
    mentorGroupData.map(
      ({ mentor_group_name, cohort_name, seminar_group_name }) => [
        mentor_group_name,
        cohort_name,
        seminar_group_name,
      ]
    )
  );
  const mentorGroups = await db
    .query(insertMentorGroups)
    .then(({ rows }) => rows)
    .catch(console.log);

  const insertStaff = format(
    `INSERT INTO staff 
      (employee_name, role, campus, team, start_date, cohort_name, seminar_group_name, mentor_group_name, holidays_left, absences, pdp_scheme, computer_serial, fob_serial) 
      VALUES %L RETURNING*;`,
    staffData.map(
      ({
        employee_name,
        role,
        campus,
        team,
        start_date,
        cohort_name,
        seminar_group_name,
        mentor_group_name,
        holidays_left,
        absences,
        pdp_scheme,
        computer_serial,
        fob_serial,
      }) => [
        employee_name,
        role,
        campus,
        team,
        start_date,
        cohort_name,
        seminar_group_name,
        mentor_group_name,
        holidays_left,
        absences,
        pdp_scheme,
        computer_serial,
        fob_serial,
      ]
    )
  );
  const staff = await db
    .query(insertStaff)
    .then(({ rows }) => rows)
    .catch(console.log);

  const insertStudents = format(
    `INSERT INTO students 
      (student_name, cohort_name, seminar_group_name, mentor_group_name) 
      VALUES %L RETURNING*;`,
    studentData.map(
      ({
        student_name,
        cohort_name,
        seminar_group_name,
        mentor_group_name,
      }) => [student_name, cohort_name, seminar_group_name, mentor_group_name]
    )
  );
  const students = await db
    .query(insertStudents)
    .then(({ rows }) => {
      console.log(rows);
    })
    .catch(console.log);
};

module.exports = seed;
