const express = require('express');
const {
  getStaff,
  postNewStaff,
  getStaffById,
} = require('./controllers/staff.controllers');
const { invalidPath, psqlErrors, customErrors } = require('./errors/errors');

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/staff', getStaff);
app.get('/api/staff/:staff_id', getStaffById);

app.post('/api/staff', postNewStaff);

app.all('/*', invalidPath);

app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
