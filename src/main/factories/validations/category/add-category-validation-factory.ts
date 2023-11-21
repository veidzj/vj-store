import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

export const makeAddCategoryValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
