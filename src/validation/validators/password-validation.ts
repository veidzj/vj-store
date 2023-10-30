import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { type Validation } from '@/presentation/protocols/validation'

export class PasswordValidation implements Validation {
  constructor(private readonly field: string) {}

  public validate = (input: any): Error | null => {
    if (input.length < 6) {
      return new InvalidParamError(this.field, 'must be at least 6 characters long')
    }
    return null
  }
}
