const { selectCohorts } = require('../models/cohort.models');

exports.getCohorts = (req, res, next) => {
  selectCohorts()
    .then((cohorts) => {
      res.status(200).send({ cohorts });
    })
    .catch(next);
};
