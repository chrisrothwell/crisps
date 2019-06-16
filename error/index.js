const NotFoundError = require('./NotFound')
const ValidationError = require('./Validation')
const ForbiddenError = require('./Forbidden')
const UnauthorizedError = require('./Unauthorized')

module.exports = {
  NotFoundError,
  ValidationError,
  ForbiddenError,
  UnauthorizedError
}
