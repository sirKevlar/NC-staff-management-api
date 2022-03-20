const {
  selectStudents,
  insertNewStudent,
  selectStudentById,
  updateStudentById,
  removeStudentById,
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

exports.patchStudentById = (req, res, next) => {
  updateStudentById(req)
    .then((student) => {
      res.status(200).send({ student });
    })
    .catch(next);
};

exports.deleteStudentById = (req, res, next) => {
  removeStudentById(req.params)
    .then((deletedStudent) => {
      res.status(204).send({ deletedStudent });
    })
    .catch(next);
};
