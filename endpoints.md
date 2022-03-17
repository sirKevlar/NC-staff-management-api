## Endpoints

`GET /api`
fetch details of available endpoints

`GET /staff`
fetch array of staff objects

`POST /staff`
post a new staff object

`GET /staff/:staff_id`
fetch individual staff object by id

`PATCH /staff/:staff_id`
append existing individual staff object by id

`DELETE /staff/:staff_id`
delete existing individual staff object by id

`GET /staff/:cohort`
fetch array of staff objects by cohort

`GET /staff/:seminar_group`
fetch array of staff objects by seminar group

`GET /staff/:mentor_group`
fetch array of staff objects by mentor group

`GET /staff/:staff_id/pdp`
fetch individual staff pdp details by staff id

`GET /students`
fetch array of student objects

`POST /students`
post a new student object

`GET /students/:student_id`
fetch individual student object by id

`PATCH /students/:student_id`
append existing individual student object by id

`DELETE /students/:staff_id`
delete existing individual student object by id

`GET /students/:cohort`
fetch array of staff objects by cohort

`GET /students/:seminar_group`
fetch array of staff objects by seminar group

`GET /students/:mentor_group`
fetch array of staff objects by mentor group

`GET /cohorts`
fetch array of cohort objects

`POST /cohorts`
post a new cohort object

`GET /cohorts/:cohort_id`
fetch individual cohort object by id

`PATCH /cohorts/:cohort_id`
append existing individual cohort object by id

`GET /seminar.groups`
fetch array of seminar objects

`POST /seminar.groups`
post a new seminar group object

`GET /mentor.groups`
fetch array of seminar objects

`POST /mentor.groups`
post a new seminar group object

`GET /pdp.schemes`
fetch array of pdp scheme objects

`POST /pdp.schemes`
post a new pdp scheme object

`GET /pdp.schemes/:scheme_id`
fetch individual scheme object by id

`DELETE /pdp.schemes/:scheme_id`
delete individual scheme object by id

**Do we need endpoints for getting all the students associated with a staff member?**

**Do we need endpoints for getting all the staff associated with a student?**