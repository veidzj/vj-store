import { ValidationError } from '@/domain/errors'
import { type Validation } from '@/presentation/protocols'
import { faker } from '@faker-js/faker'

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
