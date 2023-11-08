export class ExpiredTokenError extends Error {
  constructor() {
    super('Expired token')
    this.name = 'ExpiredTokenError'
  }
}
