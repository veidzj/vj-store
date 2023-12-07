import { InvalidParamError } from '@/validation/errors'
import { type UrlValidator } from '@/validation/protocols'
import { type Validation } from '@/presentation/protocols'

export class UrlValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly urlValidator: UrlValidator
  ) {}

  validate = (input: any): void => {
    for (const value of input[this.fieldName]) {
      const isValid = this.urlValidator.isValid(value)
      if (!isValid) {
        throw new InvalidParamError(this.fieldName, 'must have valid urls')
      }
    }
  }
}
