import { TokenError } from '@/domain/errors/token-error'

export class InvalidTokenError extends TokenError {
  constructor() {
    super('Invalid token')
  }
}
