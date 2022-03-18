const express = require('express');
const { getStaff } = require('./controllers/staff.controllers');
const { invalidPath } = require('./errors/errors');

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/staff', getStaff);

app.all('/*', invalidPath);

module.exports = app;
