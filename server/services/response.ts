export default class Response {
  code!: number
  message!: string
  // contrutor
  // success
  public success(text: string = '') {
    this.code = 200
    this.message = text || 'OK'
    return this
  }
  // bad request
  public badRequest(text: string = '') {
    this.code = 400
    this.message = text || 'Bad Request'
    return this
  }
  // unauthorize
  public unauthorize(text: string = '') {
    this.code = 401
    this.message = text || 'Unauthorized'
    return this
  }
  // forbidend
  public forbidden(text: string = '') {
    this.code = 403
    this.message = text || 'Forbidden'
    return this
  }
  // not found
  public notFound(text: string = '') {
    this.code = 404
    this.message = text || 'Not Found'
    return this
  }
  // not found
  public notAllowed(text: string = '') {
    this.code = 405
    this.message = text || 'Method Not Allowed'
    return this
  }

  public timeout(text: string = '') {
    this.code = 408
    this.message = text || 'Request Timeout'
    return this
  }
  // timeout
  public unproccesableEntity(text: string = '') {
    this.code = 422
    this.message = text || 'Unprocessable Entity'
    return this
  }
  // internal server error
  public error(text: string = '') {
    this.code = 500
    this.message = text || 'Internal Server Error'
    return this
  }
  // internal server error
  public notImplemented(text: string = '') {
    this.code = 501
    this.message = text || 'Not Implemented'
    return this
  }
  // bad gateway
  public badGateway(text: string = '') {
    this.code = 502
    this.message = text || 'Unprocessable Entity'
    return this
  }
  // unavailable
  public unavailable(text: string = '') {
    this.code = 503
    this.message = text || 'Service Unavailable'
    return this
  }
  // create response
  public create(data: any) {
    const fieldName = typeof data == 'string' ? 'message' : 'data'
    return {
      code: this.code,
      status: this.message,
      [fieldName]: data,
    }
  }
}
