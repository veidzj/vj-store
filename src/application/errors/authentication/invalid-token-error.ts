import { AuthenticationError } from '@/domain/errors'

export class InvalidTokenError extends AuthenticationError {
  constructor() {
    super('Invalid token')
  }
}
