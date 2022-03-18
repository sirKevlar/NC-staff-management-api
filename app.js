const express = require('express');
const { getStaff, postNewStaff } = require('./controllers/staff.controllers');
const { invalidPath } = require('./errors/errors');

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/staff', getStaff);

app.post('/api/staff', postNewStaff);

app.all('/*', invalidPath);

module.exports = app;
