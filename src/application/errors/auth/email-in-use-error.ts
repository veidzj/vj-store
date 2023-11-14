import { AuthenticationError } from '@/domain/errors'

export class EmailInUseError extends AuthenticationError {
  constructor() {
    super('Email already in use')
  }
}
