\c nc_staff_management

SELECT * FROM staff
LEFT JOIN events ON events.event_id = staff.event_id 
LEFT JOIN students ON events.cohort = students.cohort_name 
WHERE student_id = '12'