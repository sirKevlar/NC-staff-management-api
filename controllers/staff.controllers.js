const {
  selectStaff,
  insertNewStaff,
  selectStaffById,
  updateStaffById,
  removeStaffById,
} = require('../models/staff.models');

exports.getStaff = (req, res, next) => {
  selectStaff(req.query)
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

exports.getStaffById = (req, res, next) => {
  selectStaffById(req.params)
    .then((employee) => {
      res.status(200).send({ employee });
    })
    .catch(next);
};

exports.patchStaffById = (req, res, next) => {
  updateStaffById(req)
    .then((employee) => {
      res.status(200).send({ employee });
    })
    .catch(next);
};

exports.deleteStaffById = (req, res, next) => {
  removeStaffById(req.params)
    .then((deletedEmployee) => {
      res.status(204).send({ deletedEmployee });
    })
    .catch(next);
};
