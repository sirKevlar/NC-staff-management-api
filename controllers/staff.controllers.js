const { selectStaff } = require('../models/staff.models');

exports.getStaff = (req, res, next) => {
  selectStaff()
    .then((staff) => {
      res.status(200).send({ staff });
    })
    .catch(console.log);
};
