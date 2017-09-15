module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  console.log('in error handler', err)

  res
    .status(err.statusCode || 500)
    .json({
      message: err.message || 'Unknown Error',
      data: err
    })
}
