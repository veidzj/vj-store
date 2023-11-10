import { MissingParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate = (input: any): void => {
    if (!input[this.fieldName]) {
      throw new MissingParamError(this.fieldName)
    }
  }
}
