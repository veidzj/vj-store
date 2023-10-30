import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { type Validation } from '@/presentation/protocols/validation'
import { type NameValidator } from '@/validation/protocols/name-validator'

export class NameValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly nameValidator: NameValidator
  ) {}

  public validate = (input: any): Error | null => {
    const isValid = this.nameValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
    return null
  }
}
