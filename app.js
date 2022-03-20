const express = require('express');
const {
  getStaff,
  postNewStaff,
  getStaffById,
  patchStaffById,
  deleteStaffById,
} = require('./controllers/staff.controllers');
const { getStudents } = require('./controllers/student.controllers');
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

app.all('/*', invalidPath);

app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
