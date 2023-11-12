import { AuthorizationError } from '@/domain/errors'

export class AccessDeniedError extends AuthorizationError {
  constructor() {
    super('Access denied')
  }
}
