import { AuthenticationError } from '@/domain/errors'

export class AccountNotFoundError extends AuthenticationError {
  constructor() {
    super('Account not found')
  }
}
