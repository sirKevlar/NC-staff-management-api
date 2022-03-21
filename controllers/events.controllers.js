const { insertNewEvent } = require('../models/events.models');

exports.postNewEvent = (req, res, next) => {
  insertNewEvent(req.body)
    .then((newEvent) => {
      res.status(201).send({ newEvent });
    })
    .catch(next);
};
