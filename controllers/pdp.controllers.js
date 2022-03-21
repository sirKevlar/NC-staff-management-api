const {
  selectPdps,
  insertNewPdp,
  selectPdpById,
  updatePdpById,
} = require('../models/pdp.models');

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

exports.getPdpById = (req, res, next) => {
  selectPdpById(req.params)
    .then((pdp) => {
      res.status(200).send({ pdp });
    })
    .catch(next);
};

exports.patchPdpById = (req, res, next) => {
  updatePdpById(req)
    .then((pdp) => {
      res.status(200).send({ pdp });
    })
    .catch(next);
};
