const createError = (statusCode, errorCode, message) => (info) => {
  const err = Error(message)
  err.type = 'RestError'
  err.serverStatusCode = statusCode
  err.errorCode = errorCode
  err.errorMessage = message
  err.info = info
  return err
}

module.exports = {
  unknownEmail: createError(401, 'UNKNOWN_EMAIL', 'The email address was not found.'),

  incorrectPassword: createError(401, 'INCORRECT_PASSWORD', 'The password entered was incorrect.'),

  duplicateEmail: createError(401, 'DUPLICATE_EMAIL', 'An account already exists with that email address.'),

  missingCredentials: createError(401, 'MISSING_CREDENTIALS', 'The email and/or password fields are invalid.'),

  missingEmail: createError(401, 'MISSING_EMAIL', 'The email field is required.'),

  missingPassword: createError(401, 'MISSING_PASSWORD', 'The password field is required.')
}
