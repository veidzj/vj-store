import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class SortProductValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate = (input: any): void => {
    const value = input[this.fieldName]
    if (value !== 'latest' && value !== 'discount') {
      throw new InvalidParamError(this.fieldName)
    }
  }
}
