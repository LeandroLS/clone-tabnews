export class InternalServerError extends Error {
  constructor({ cause }) {
    super('Unexpected internal server error', { cause })
    this.name = 'InternalServerError'
    this.action = 'Please contact the administrator'
    this.statusCode = 500
  }

  toJSON() {
    return {
      error: 'Internal Server Error',
      message: this.message,
      action: this.action,
      name: this.name,
      status_code: this.statusCode,
    }
  }
}
