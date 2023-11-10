import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  public validate = (input: any): void => {
    if (input[this.field] !== input[this.fieldToCompare]) {
      throw new InvalidParamError(this.fieldToCompare, `needs to be equal to ${this.field}`)
    }
  }
}
