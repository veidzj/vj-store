import { SignInValidationFactory } from '@/main/factories/validations/auth'
import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { EmailValidation } from '@/validation/validators/auth'

jest.mock('@/validation/validators/validation-composite')

describe('SignInValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    SignInValidationFactory.makeSignInValidation()
    const validations: Validation[] = []
    for (let i = 0; i < ['email', 'password'].length; i++) {
      validations.push(expect.any(RequiredFieldValidation))
    }
    validations.push(expect.any(EmailValidation))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
