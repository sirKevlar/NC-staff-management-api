## Endpoints

`GET /api`
fetch details of available endpoints

`GET /staff`
fetch array of staff objects ✅

`POST /staff`
post a new staff object ✅

`GET /staff?:query=:quertValue`
fetch array of staff objects filtered by (currentCohort/role/campus/team/pdp_scheme/student) ✅

<!-- `GET /staff?seminar=:seminar_name&sort=date&order=:order`
fetch array of staff objects filtered by seminar_group, sorted by date, flexible order

`GET /staff?mentor=:mentor_name&sort=date&order=:order`
fetch array of staff objects filtered by seminar_group, sorted by date, flexible order -->

`GET /staff/:staff_id`
fetch individual staff object by id ✅

`PATCH /staff/:staff_id`
append existing individual staff object by id ✅

`DELETE /staff/:staff_id`
delete existing individual staff object by id ✅

`GET /students`
fetch array of student objects ✅

`POST /students`
post a new student object ✅

`GET /students?cohort=:cohort`
fetch array of student objects filtered by cohort ✅

<!-- `GET /students/:seminar_group` **turn into queries on students**
fetch array of staff objects by seminar group

`GET /students/:mentor_group` **turn into queries on students**
fetch array of staff objects by mentor group -->

`GET /student/:student_id`
fetch individual student object by id ✅

`PATCH /students/:student_id`
append existing individual student object by id

`DELETE /students/:student_id`
delete existing individual student object by id

`GET /cohorts`
fetch array of cohort objects

`POST /cohorts`
post a new cohort object

fetch individual cohort object by id
`GET /cohorts/:cohort_id`
**basic cohort deets number of students/dates etc**

`PATCH /cohorts/:cohort_id`
append existing individual cohort object by id

<!-- `GET /seminar.groups`
fetch array of seminar objects

`POST /seminar.groups` **this post handled by cohorts post add patch**
post a new seminar group object

`GET /mentor.groups`
fetch array of seminar objects

`POST /mentor.groups` **this post handled by cohorts post add patch**
post a new seminar group object -->

`GET /pdp.schemes`
fetch array of pdp scheme objects

`POST /pdp.schemes`
post a new pdp scheme object

`GET /pdp.schemes/:scheme_id`
fetch individual scheme object by id

`GET /event.history`
fetch array of event history objects

`POST /event.history`
post a new event object

**Do we need endpoints for getting all the staff associated with a student? YES**
