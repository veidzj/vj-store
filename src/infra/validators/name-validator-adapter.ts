import validator from 'validator'
import { type NameValidator } from '@/validation/protocols/name-validator'

export class NameValidatorAdapter implements NameValidator {
  public isValid = (name: string): boolean => {
    return validator.isAlpha(name)
  }
}
