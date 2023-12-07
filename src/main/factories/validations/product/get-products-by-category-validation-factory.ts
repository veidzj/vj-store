import { type Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'
import { SortProductValidation } from '@/validation/validators/product'

export class GetProductsByCategoryValidationFactory {
  public static makeGetProductsByCategoryValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    validations.push(new SortProductValidation('sortBy'))
    return new ValidationComposite(validations)
  }
}
