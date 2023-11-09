import { type EmailValidator } from '@/validation/protocols'
import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

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
