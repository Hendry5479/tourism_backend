module.exports = function(err, req, res, next) {
  console.log(err)
  if (401 === err.status) {
    res.status(err.status).send({
      code: 9999,
      message: 'Protected resource, use Authorization header to get access\n',
    })
  } else {
    res.status(err.status).send({
      code: 9999,
      message: error.stack,
    })
  }
}
