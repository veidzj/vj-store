import { type EmailValidator } from '../../../src/validation/protocols/email-validator'

export class EmailValidatorSpy implements EmailValidator {
  public email: string
  public isEmailValid: boolean = true

  public isValid = (email: string): boolean => {
    this.email = email
    return this.isEmailValid
  }
}
