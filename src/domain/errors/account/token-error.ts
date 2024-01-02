export class TokenError extends Error {
  constructor() {
    super('Invalid or expired token')
  }
}
