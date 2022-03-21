const { selectCohorts, insertNewCohort } = require('../models/cohort.models');

exports.getCohorts = (req, res, next) => {
  selectCohorts()
    .then((cohorts) => {
      res.status(200).send({ cohorts });
    })
    .catch(next);
};

exports.postNewCohort = (req, res, next) => {
  insertNewCohort(req.body)
    .then((newCohort) => {
      res.status(201).send({ newCohort });
    })
    .catch(next);
};
