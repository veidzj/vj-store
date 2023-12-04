import { type Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export class AddCategoryValidationFactory {
  public static makeAddCategoryValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
  }
}
