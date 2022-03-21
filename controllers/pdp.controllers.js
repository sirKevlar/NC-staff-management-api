const { selectPdps, insertNewPdp } = require('../models/pdp.models');

exports.getPdps = (req, res, next) => {
  selectPdps()
    .then((pdps) => {
      res.status(200).send({ pdps });
    })
    .catch(next);
};

exports.postNewPdp = (req, res, next) => {
    insertNewPdp(req.body)
      .then((newPdp) => {
        res.status(201).send({ newPdp });
      })
      .catch(next);
  };