const express = require('express');
const { getStaff } = require('./controllers/staff.controllers');

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/staff', getStaff);



module.exports = app;
