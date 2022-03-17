module.exports = (array) => {
  if (array.length === 0) return {};

  const lookup = {};

  array.forEach((person) => {
    const employeeName = person.employee_name;
    const staffId = person.staff_id;

    lookup[employeeName] = staffId;
  });

  return lookup;
};
