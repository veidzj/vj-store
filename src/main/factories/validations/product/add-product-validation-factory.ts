import { type Validation } from '@/presentation/protocols'
import { PositiveNumberValidation, RequiredFieldValidation, UrlValidation, ValidationComposite } from '@/validation/validators'
import { DiscountValidation } from '@/validation/validators/product'
import { UrlValidatorAdapter } from '@/infra/validators'

export const makeAddProductValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'description', 'price', 'discountPercentage', 'category', 'imageUrls', 'quantity']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PositiveNumberValidation('price'))
  validations.push(new PositiveNumberValidation('quantity'))
  validations.push(new DiscountValidation('discountPercentage'))
  validations.push(new UrlValidation('imageUrls', new UrlValidatorAdapter()))
  return new ValidationComposite(validations)
}
