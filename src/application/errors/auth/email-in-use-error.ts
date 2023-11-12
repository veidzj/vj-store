import { AuthenticationError } from '@/domain/errors'

export class EmailInUseError extends AuthenticationError {
  constructor() {
    super('Email is already in use')
  }
}
