import { type Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  public input: any
  public error: Error | null = null

  public validate = (input: any): Error | null => {
    this.input = input
    return this.error
  }
}
