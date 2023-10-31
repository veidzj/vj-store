import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { type Validation } from '@/presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  public validate = (input: any): Error | null => {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare, `needs to be equal to ${this.field}`)
    }
    return null
  }
}
