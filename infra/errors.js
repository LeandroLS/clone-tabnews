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

export class MethodNotAllowedError extends Error {
  constructor() {
    super('Método não permitido para este endpoint.')
    this.name = 'MethodNotAllowedError'
    this.action = 'Verifique se o método HTTP utilizado é valido para este endpoint.'
    this.statusCode = 405
  }

  toJSON() {
    return {
      message: this.message,
      action: this.action,
      name: this.name,
      status_code: this.statusCode,
    }
  }
}
