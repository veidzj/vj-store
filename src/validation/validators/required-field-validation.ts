import { MissingParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate = (input: any): void => {
    const value = input[this.fieldName]
    if (value === null || value === undefined || value === '' || value === false || value.length === 0) {
      throw new MissingParamError(this.fieldName)
    }
  }
}
