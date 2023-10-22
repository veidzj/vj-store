import { type Validation } from '../../../src/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  input: any
  error: Error | null = null

  public validate = (input: any): Error | null => {
    this.input = input
    return this.error
  }
}
