import { faker } from '@faker-js/faker'

import { type Validation } from '@/presentation/protocols'
import { ValidationError } from '@/domain/errors'

export class ValidationSpy implements Validation {
  public input: any
  public hasError: boolean = false
  public error: ValidationError = new ValidationError(faker.word.words())

  public validate = (input: any): void => {
    this.input = input
    if (this.hasError) {
      throw this.error
    }
  }
}
