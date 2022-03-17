const createLookup = require('../utils/createLookup');

describe('createLookup', () => {
  test('input: empty array, output: empty object', () => {
    const input = [];
    const actual = createLookup(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test('input: array with single object, output: lookup object', () => {
    const input = [
      {
        staff_id: 1,
        employee_name: 'kev morel',
        role: 'junior software engineer and mentor',
        campus: 'manchester',
        team: 'classroom',
        start_date: '2021-09-20',
        cohort_name: 'september-2021',
        seminar_group_name: 'seminar-1_september-2021',
        mentor_group_name: 'mentor-1_seminar-1_september-2021',
        holidays_left: 20,
        absences: 0,
        pdp_scheme: 'AWS cloud certification',
        computer_serial: 'not#a12serial',
        fob_serial: 'open2n0th1ng',
      },
    ];
    const actual = createLookup(input);
    const expected = { 'kev morel': 1 };
    expect(actual).toEqual(expected);
  });
  test('input: array with several objects, output: lookup object', () => {
    const input = [
      {
        staff_id: 1,
        employee_name: 'kev morel',
        role: 'junior software engineer and mentor',
        campus: 'manchester',
        team: 'classroom',
        start_date: '2021-09-20',
        cohort_name: 'september-2021',
        seminar_group_name: 'seminar-1_september-2021',
        mentor_group_name: 'mentor-1_seminar-1_september-2021',
        holidays_left: 20,
        absences: 0,
        pdp_scheme: 'AWS cloud certification',
        computer_serial: 'not#a12serial',
        fob_serial: 'open2n0th1ng',
      },
      {
        staff_id: 2,
        employee_name: 'rose mullan',
        role: 'junior software engineer and mentor',
        campus: 'manchester',
        team: 'classroom',
        start_date: '2021-09-20',
        cohort_name: 'september-2021',
        seminar_group_name: 'seminar-2_september-2021',
        mentor_group_name: 'mentor-1_seminar-2_september-2021',
        holidays_left: 18,
        absences: 1,
        pdp_scheme: 'SCRUM certification',
        computer_serial: 'not#a17serial',
        fob_serial: 'open3n0th1ng',
      },
      {
        staff_id: 3,
        employee_name: 'sam parry',
        role: 'junior software engineer and mentor',
        campus: 'manchester',
        team: 'classroom',
        start_date: '2021-10-18',
        cohort_name: 'november-2021',
        seminar_group_name: 'seminar-1_november-2021',
        mentor_group_name: 'mentor-1_seminar-1_november-2021',
        holidays_left: 7,
        absences: 1,
        pdp_scheme: 'AWS cloud certification',
        computer_serial: 'not#a27serial',
        fob_serial: 'cheerios',
      },
    ];
    const actual = createLookup(input);
    const expected = { 'kev morel': 1, 'rose mullan': 2, 'sam parry': 3 };
    expect(actual).toEqual(expected);
  });
  test('does not mutate input', () => {
    const input = [
      {
        staff_id: 1,
        employee_name: 'kev morel',
        role: 'junior software engineer and mentor',
        campus: 'manchester',
        team: 'classroom',
        start_date: '2021-09-20',
        cohort_name: 'september-2021',
        seminar_group_name: 'seminar-1_september-2021',
        mentor_group_name: 'mentor-1_seminar-1_september-2021',
        holidays_left: 20,
        absences: 0,
        pdp_scheme: 'AWS cloud certification',
        computer_serial: 'not#a12serial',
        fob_serial: 'open2n0th1ng',
      },
    ];
    createLookup(input);
    expect(input).toEqual([
      {
        staff_id: 1,
        employee_name: 'kev morel',
        role: 'junior software engineer and mentor',
        campus: 'manchester',
        team: 'classroom',
        start_date: '2021-09-20',
        cohort_name: 'september-2021',
        seminar_group_name: 'seminar-1_september-2021',
        mentor_group_name: 'mentor-1_seminar-1_september-2021',
        holidays_left: 20,
        absences: 0,
        pdp_scheme: 'AWS cloud certification',
        computer_serial: 'not#a12serial',
        fob_serial: 'open2n0th1ng',
      },
    ]);
  });
});
