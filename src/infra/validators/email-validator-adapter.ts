import validator from 'validator'
import { type EmailValidator } from '@/validation/protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  public isValid = (email: string): boolean => {
    return validator.isEmail(email)
  }
}
