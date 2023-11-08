import { TokenError } from '@/domain/errors/token-error'

export class ExpiredTokenError extends TokenError {
  constructor() {
    super('Expired token')
  }
}
