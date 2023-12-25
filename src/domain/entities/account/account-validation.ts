import isAlpha from 'validator/lib/isAlpha'
import isLowercase from 'validator/lib/isLowercase'
import isEmail from 'validator/lib/isEmail'

import { EntityValidationError } from '@/domain/errors'

export class AccountValidation {
  public static validateUsername(username: string): void {
    if (username.length < 3) {
      throw new EntityValidationError('Username must be at least 3 characters long')
    }
    if (username.length > 12) {
      throw new EntityValidationError('Username must be less than or equal to 12 characters long')
    }
    if (!isAlpha(username)) {
      throw new EntityValidationError('Username must contain only letters')
    }
    if (!isLowercase(username)) {
      throw new EntityValidationError('Username must be lowercase')
    }
  }

  public static validateEmail(email: string): void {
    if (!isEmail(email)) {
      throw new EntityValidationError('Email must be valid')
    }
  }

  public static validatePassword(password: string): void {
    if (password.length < 6) {
      throw new EntityValidationError('Password must must be at least 6 characters long')
    }
    if (password.length > 255) {
      throw new EntityValidationError('Password must be less than or equal to 255 characters long')
    }
  }
}
