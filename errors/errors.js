exports.invalidPath = (req, res) => {
  res.status(404).send({ msg: 'path not found' });
};

exports.psqlErrors = (err, req, res, next) => {
  if (err.code === '23502') {
    res.status(400).send({ msg: 'Bad request' });
  }
};
