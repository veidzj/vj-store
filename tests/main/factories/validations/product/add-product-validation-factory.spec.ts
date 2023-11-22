import { makeAddProductValidation } from '@/main/factories/validations/product'
import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, PositiveNumberValidation, RequiredFieldValidation, UrlValidation } from '@/validation/validators'
import { DiscountValidation } from '@/validation/validators/product'

jest.mock('@/validation/validators/validation-composite')

describe('AddProductValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProductValidation()

    const validations: Validation[] = []
    for (let i = 0; i < ['name', 'description', 'price', 'discountPercentage', 'category', 'imageUrls', 'quantity'].length; i++) {
      validations.push(expect.any(RequiredFieldValidation))
    }
    validations.push(expect.any(PositiveNumberValidation))
    validations.push(expect.any(PositiveNumberValidation))
    validations.push(expect.any(DiscountValidation))
    validations.push(expect.any(UrlValidation))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
