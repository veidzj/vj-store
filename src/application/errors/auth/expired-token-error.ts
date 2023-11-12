import { AuthenticationError } from '@/domain/errors'

export class ExpiredTokenError extends AuthenticationError {
  constructor() {
    super('Expired token')
  }
}
