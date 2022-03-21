const express = require('express');
const {
  getCohorts,
  postNewCohort,
  getCohortById,
  patchCohortById,
} = require('./controllers/cohort.controllers');
const { getPdps, postNewPdp } = require('./controllers/pdp.controllers');
const {
  getStaff,
  postNewStaff,
  getStaffById,
  patchStaffById,
  deleteStaffById,
} = require('./controllers/staff.controllers');
const {
  getStudents,
  postNewStudent,
  getStudentById,
  patchStudentById,
  deleteStudentById,
} = require('./controllers/student.controllers');
const { invalidPath, psqlErrors, customErrors } = require('./errors/errors');

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/staff', getStaff);
app.post('/api/staff', postNewStaff);
app.get('/api/staff/:staff_id', getStaffById);
app.patch('/api/staff/:staff_id', patchStaffById);
app.delete('/api/staff/:staff_id', deleteStaffById);

app.get('/api/students', getStudents);
app.post('/api/students', postNewStudent);
app.get('/api/students/:student_id', getStudentById);
app.patch('/api/students/:student_id', patchStudentById);
app.delete('/api/students/:student_id', deleteStudentById);

app.get('/api/cohorts', getCohorts);
app.post('/api/cohorts', postNewCohort);
app.get('/api/cohorts/:cohort_name', getCohortById);
app.patch('/api/cohorts/:cohort_name', patchCohortById);

app.get('/api/pdps', getPdps);
app.post('/api/pdps', postNewPdp);

app.all('/*', invalidPath);

app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
