import { type Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  public validate = (input: any): void => {
    for (const validation of this.validations) {
      validation.validate(input)
    }
  }
}
