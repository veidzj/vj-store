import { EntityValidationError } from '@/domain/errors'

export class AccountValidation {
  public static validateUsername(username: string): void {
    if (username.length < 3) {
      throw new EntityValidationError('Username must be at least 3 characters long')
    }
    if (username.length > 12) {
      throw new EntityValidationError('Username must be less than or equal to 12 characters long')
    }
    if (!/^[A-Za-z]+$/.test(username)) {
      throw new EntityValidationError('Username must contain only letters')
    }
    if (!/^[a-z]+$/.test(username)) {
      throw new EntityValidationError('Username must be lowercase')
    }
  }
}
