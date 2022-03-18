const format = require('pg-format');
const db = require('./');
const { dropTables, createTables } = require('./manage-tables');

const seed = async ({
  cohortData,
  // mentorGroupData,
  pdpData,
  // seminarGroupData,
  staffData,
  studentData,
  eventHistoryData,
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

  const insertEvents = format(
    `INSERT INTO events 
      (employee_name, start_date, end_date, cohort) 
      VALUES %L RETURNING*;`,
    eventHistoryData.map(({ employee_name, start_date, end_date, cohort }) => [
      employee_name,
      start_date,
      end_date,
      cohort,
    ])
  );
  const eventHistory = await db
    .query(insertEvents)
    .then(({ rows }) => rows)
    .catch(console.log);

  // const insertSeminarGroups = format(
  //   `INSERT INTO seminar_groups
  //     (seminar_group_name, cohort_name)
  //     VALUES %L RETURNING*;`,
  //   seminarGroupData.map(({ seminar_group_name, cohort_name }) => [
  //     seminar_group_name,
  //     cohort_name,
  //   ])
  // );
  // const seminarGroups = await db
  //   .query(insertSeminarGroups)
  //   .then(({ rows }) => rows)
  //   .catch(console.log);

  // const insertMentorGroups = format(
  //   `INSERT INTO mentor_groups
  //     (mentor_group_name, cohort_name, seminar_group_name)
  //     VALUES %L RETURNING*;`,
  //   mentorGroupData.map(
  //     ({ mentor_group_name, cohort_name, seminar_group_name }) => [
  //       mentor_group_name,
  //       cohort_name,
  //       seminar_group_name,
  //     ]
  //   )
  // );
  // const mentorGroups = await db
  //   .query(insertMentorGroups)
  //   .then(({ rows }) => rows)
  //   .catch(console.log);

  // the above has been temporarily removed

  const insertStaff = format(
    `INSERT INTO staff
      (employee_name, role, campus, team, start_date, event_id, holidays_left, absences, pdp_scheme, computer_serial, fob_serial, notes)
      VALUES %L RETURNING*;`,
    staffData.map(
      ({
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
      }) => [
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
  );
  const staff = await db
    .query(insertStaff)
    .then(({ rows }) => rows)
    .catch(console.log);

  const insertStudents = format(
    `INSERT INTO students
      (student_name, cohort_name, notes)
      VALUES %L RETURNING*;`,
    studentData.map(({ student_name, cohort_name, notes }) => [
      student_name,
      cohort_name,
      notes,
    ])
  );
  const students = await db
    .query(insertStudents)
    .then(({ rows }) => rows)
    .catch(console.log);
};

module.exports = seed;
