import { GetProductsByCategoryValidationFactory } from '@/main/factories/validations/product/get-products-by-category-validation-factory'
import { type Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'
import { SortProductValidation } from '@/validation/validators/product'

jest.mock('@/validation/validators/validation-composite')

describe('GetProductsByCategoryValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    GetProductsByCategoryValidationFactory.makeGetProductsByCategoryValidation()

    const validations: Validation[] = []
    validations.push(expect.any(SortProductValidation))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
