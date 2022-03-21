const { selectPdps } = require('../models/pdp.models');

exports.getPdps = (req, res, next) => {
  selectPdps()
    .then((pdps) => {
      res.status(200).send({ pdps });
    })
    .catch(next);
};
