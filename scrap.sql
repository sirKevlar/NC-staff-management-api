\c nc_staff_management

SELECT * FROM staff
LEFT JOIN events ON events.event_id = staff.event_id
WHERE events.cohort = 'september-2021';