import { InvalidParamError } from '../../presentation/errors/invalid-param-error'
import { type Validation } from '../../presentation/protocols/validation'
import { type EmailValidator } from '../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly emailValidator: EmailValidator
  ) {}

  public validate = (input: any): Error | null => {
    const isValid = this.emailValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
    return null
  }
}
