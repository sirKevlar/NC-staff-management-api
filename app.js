const express = require('express');
const {
  getStaff,
  postNewStaff,
  getStaffById,
  patchStaffById,
} = require('./controllers/staff.controllers');
const { invalidPath, psqlErrors, customErrors } = require('./errors/errors');

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/staff', getStaff);
app.post('/api/staff', postNewStaff);
app.get('/api/staff/:staff_id', getStaffById);
app.patch('/api/staff/:staff_id', patchStaffById);

app.all('/*', invalidPath);

app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
