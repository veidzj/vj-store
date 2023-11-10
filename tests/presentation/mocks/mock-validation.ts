import { type Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  public input: any

  public validate = (input: any): void => {
    this.input = input
  }
}
