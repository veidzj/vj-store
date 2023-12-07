import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PositiveNumberValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate = (input: any): void => {
    const value = input[this.fieldName]
    if (typeof value !== 'number' || value < 0) {
      throw new InvalidParamError(this.fieldName, 'needs to be greater than 0')
    }
  }
}
