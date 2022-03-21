const {
  selectCohorts,
  insertNewCohort,
  selectCohortById,
} = require('../models/cohort.models');

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

exports.getCohortById = (req, res, next) => {
  selectCohortById(req.params)
    .then((cohort) => {
      res.status(200).send({ cohort });
    })
    .catch(next);
};
