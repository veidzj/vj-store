import { type UsernameValidator } from '@/validation/protocols'
import { type Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

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
