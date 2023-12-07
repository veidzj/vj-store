import { AddCategoryValidationFactory } from '@/main/factories/validations/category'
import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('AddCategoryValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    AddCategoryValidationFactory.makeAddCategoryValidation()

    const validations: Validation[] = []
    for (let i = 0; i < ['name'].length; i++) {
      validations.push(expect.any(RequiredFieldValidation))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
