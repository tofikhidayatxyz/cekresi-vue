export default class Response {
  constructor() {
    this.code = 200
    this.message = 'Ok'
  }
  // contrutor
  // success
  success(text) {
    this.code = 200
    this.message = text || 'OK'
    return this
  }
  // bad request
  badRequest(text) {
    this.code = 400
    this.message = text || 'Bad Request'
    return this
  }
  // unauthorize
  unauthorize(text) {
    this.code = 401
    this.message = text || 'Unauthorized'
    return this
  }
  // forbidend
  forbidden(text) {
    this.code = 403
    this.message = text || 'Forbidden'
    return this
  }
  // not found
  notFound(text) {
    this.code = 404
    this.message = text || 'Not Found'
    return this
  }
  // not found
  notAllowed(text) {
    this.code = 405
    this.message = text || 'Method Not Allowed'
    return this
  }

  timeout(text) {
    this.code = 408
    this.message = text || 'Request Timeout'
    return this
  }
  // timeout
  unproccesableEntity(text) {
    this.code = 422
    this.message = text || 'Unprocessable Entity'
    return this
  }
  // internal server error
  error(text) {
    this.code = 500
    this.message = text || 'Internal Server Error'
    return this
  }
  // internal server error
  notImplemented(text) {
    this.code = 501
    this.message = text || 'Not Implemented'
    return this
  }
  // bad gateway
  badGateway(text) {
    this.code = 502
    this.message = text || 'Unprocessable Entity'
    return this
  }
  // unavailable
  unavailable(text) {
    this.code = 503
    this.message = text || 'Service Unavailable'
    return this
  }
  // create response
  create(data) {
    const fieldName = typeof data == 'string' ? 'message' : 'data'
    return {
      code: this.code,
      status: this.message,
      [fieldName]: data,
    }
  }
}
