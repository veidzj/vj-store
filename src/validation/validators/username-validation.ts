import { type UsernameValidator } from '@/validation/protocols'
import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly usernameValidator: UsernameValidator
  ) {}

  public validate = (input: any): Error | null => {
    const isValid = this.usernameValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field, 'must include only letters')
    }
    return null
  }
}
