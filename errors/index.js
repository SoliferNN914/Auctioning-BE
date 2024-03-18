exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) res.status(err.status).send({ msg: err.msg })
  else next(err)
}
exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '23502')
    res.status(400).send({ msg: 'Required Fields Missing' })
  else if (err.code === '23505')
    res.status(409).send({ msg: 'Resource Already Exists' })
  else if (err.code) res.status(400).send({ msg: 'Bad Request' })
  else next(err)
}
exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Whoops... Internal Server Error' })
}