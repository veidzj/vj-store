import { type UsernameValidator } from '@/validation/protocols/username-validator'

export class UsernameValidatorSpy implements UsernameValidator {
  public username: string
  public isNameValid: boolean = true

  public isValid = (username: string): boolean => {
    this.username = username
    return this.isNameValid
  }
}