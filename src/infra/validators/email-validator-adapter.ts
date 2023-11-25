import validator from 'validator'

import { type EmailValidator } from '@/validation/protocols/auth'

export class EmailValidatorAdapter implements EmailValidator {
  public isValid = (email: string): boolean => {
    return validator.isEmail(email)
  }
}
