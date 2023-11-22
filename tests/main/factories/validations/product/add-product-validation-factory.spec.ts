import { makeAddProductValidation } from '@/main/factories/validations/product'
import { ValidationComposite, PositiveNumberValidation, RequiredFieldValidation, UrlValidation } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'
import { UrlValidatorAdapter } from '@/infra/validators'
import { DiscountValidation } from '@/validation/validators/product'

jest.mock('@/validation/validators/validation-composite')

describe('AddProductValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProductValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'description', 'price', 'discountPercentage', 'category', 'imageUrls', 'quantity']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new PositiveNumberValidation('price'))
    validations.push(new PositiveNumberValidation('quantity'))
    validations.push(new DiscountValidation('discountPercentage'))
    validations.push(new UrlValidation('imageUrls', new UrlValidatorAdapter()))

    expect(ValidationComposite).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fieldName: 'name', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'description', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'price', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'discountPercentage', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'category', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'imageUrls', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'quantity', validate: expect.any(Function) })
      ])
    )
  })
})
