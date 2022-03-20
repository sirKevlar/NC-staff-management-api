const { selectStudents } = require('../models/student.models');

exports.getStudents = (req, res, next) => {
  selectStudents()
    .then((students) => {
      res.status(200).send({ students });
    })
    .catch(next);
};
