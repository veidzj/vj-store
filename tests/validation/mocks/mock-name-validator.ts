import { type NameValidator } from '@/validation/protocols/name-validator'

export class NameValidatorSpy implements NameValidator {
  public name: string
  public isNameValid: boolean = true

  public isValid = (name: string): boolean => {
    this.name = name
    return this.isNameValid
  }
}
