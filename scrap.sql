\c nc_staff_management

SELECT * FROM staff
LEFT JOIN events ON staff.employee_name = events.employee_name 
LEFT JOIN students ON events.cohort = students.cohort_name 
WHERE student_id = '14'