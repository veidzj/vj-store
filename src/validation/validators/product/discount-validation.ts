import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class DiscountValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate = (input: any): void => {
    const value = input[this.fieldName]
    if (typeof value !== 'number' || value < 0 || value > 100) {
      throw new InvalidParamError(this.fieldName, 'needs to be between 0 and 100')
    }
  }
}
