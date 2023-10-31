import { type Validation } from '@/presentation/protocols/validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  public validate = (input: any): Error | null => {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }
}
