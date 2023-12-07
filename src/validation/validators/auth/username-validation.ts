import { type UsernameValidator } from '@/validation/protocols/auth'
import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly usernameValidator: UsernameValidator
  ) {}

  public validate = (input: any): void => {
    const isValid = this.usernameValidator.isValid(input[this.field])
    if (!isValid) {
      throw new InvalidParamError(this.field, 'must include only letters and a maximum of 12 characters')
    }
  }
}
