import validator from 'validator'
import { type UsernameValidator } from '@/validation/protocols/username-validator'

export class UsernameValidatorAdapter implements UsernameValidator {
  public isValid = (username: string): boolean => {
    return validator.isAlpha(username)
  }
}
