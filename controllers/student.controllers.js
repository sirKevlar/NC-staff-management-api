const {
  selectStudents,
  insertNewStudent,
  selectStudentById,
} = require('../models/student.models');

exports.getStudents = (req, res, next) => {
  selectStudents(req.query)
    .then((students) => {
      res.status(200).send({ students });
    })
    .catch(next);
};

exports.postNewStudent = (req, res, next) => {
  insertNewStudent(req.body)
    .then((newStudent) => {
      res.status(201).send({ newStudent });
    })
    .catch(next);
};

exports.getStudentById = (req, res, next) => {
  selectStudentById(req.params)
    .then((student) => {
      res.status(200).send({ student });
    })
    .catch(next);
};
