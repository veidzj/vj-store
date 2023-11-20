import { ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

export const makeAddProductValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  return new ValidationComposite(validations)
}
