import { AuthenticationError } from '@/domain/errors'

export class InvalidCredentialsError extends AuthenticationError {
  constructor() {
    super('Invalid credentials')
  }
}
