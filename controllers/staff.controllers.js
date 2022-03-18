const { selectStaff, insertNewStaff } = require('../models/staff.models');

exports.getStaff = (req, res, next) => {
  selectStaff()
    .then((staff) => {
      res.status(200).send({ staff });
    })
    .catch(next);
};

exports.postNewStaff = (req, res, next) => {
  insertNewStaff(req.body)
    .then((employee) => {
      res.status(201).send({ employee });
    })
    .catch(next);
};
