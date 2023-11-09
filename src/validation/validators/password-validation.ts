import { InvalidParamError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  constructor(private readonly field: string) {}

  public validate = (input: any): Error | null => {
    if (input[this.field].length < 6) {
      return new InvalidParamError(this.field, 'must be at least 6 characters long')
    }
    return null
  }
}
