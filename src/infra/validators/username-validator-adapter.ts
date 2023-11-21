import validator from 'validator'
import { type UsernameValidator } from '@/validation/protocols/auth'

export class UsernameValidatorAdapter implements UsernameValidator {
  public isValid = (username: string): boolean => {
    return validator.isAlpha(username) && validator.isLength(username, { max: 12 })
  }
}
