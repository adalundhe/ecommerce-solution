module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  console.log('in error handler', err.message)

  res
    .status(err.statusCode || 500)
    .json({
      message: err.message || 'Unknown Error',
      data: err
    })
}

Error.createExpressError = (message, statusCode) => {
  const err = Error(message)
  err.statusCode = statusCode
  return err
}
