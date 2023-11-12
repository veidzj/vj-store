import { AuthorizationError } from '@/domain/errors'

export class InvalidCredentialsError extends AuthorizationError {
  constructor() {
    super('Invalid credentials')
  }
}
