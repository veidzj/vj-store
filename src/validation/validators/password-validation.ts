import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  constructor(private readonly field: string) {}

  public validate = (input: any): void => {
    if (input[this.field].length < 6) {
      throw new InvalidParamError(this.field, 'must be at least 6 characters long')
    }
  }
}
