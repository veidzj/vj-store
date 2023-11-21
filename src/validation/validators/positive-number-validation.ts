import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PositiveNumberValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate = (input: any): void => {
    if (input[this.fieldName] < 0) {
      throw new InvalidParamError(this.fieldName)
    }
  }
}
