const express = require('express');
const { getStaff, postNewStaff } = require('./controllers/staff.controllers');
const { invalidPath, psqlErrors } = require('./errors/errors');

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/staff', getStaff);

app.post('/api/staff', postNewStaff);

app.all('/*', invalidPath);

app.use(psqlErrors);

module.exports = app;
