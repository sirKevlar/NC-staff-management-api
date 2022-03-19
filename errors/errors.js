exports.invalidPath = (req, res) => {
  res.status(404).send({ msg: 'path not found' });
};

exports.psqlErrors = (err, req, res, next) => {
  if (err.code === '23502' || err.code === '22P02' || err.code === '08P01') {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
};

exports.customErrors = (err, req, res, next) => {
  if (err) {
    res.status(err.status).send({ msg: err.msg });
  }
};
