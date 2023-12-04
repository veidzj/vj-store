import { SignUpValidationFactory } from '@/main/factories/validations/auth'
import { type Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, CompareFieldsValidation, ValidationComposite } from '@/validation/validators'
import { UsernameValidation, EmailValidation, PasswordValidation } from '@/validation/validators/auth'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    SignUpValidationFactory.makeSignUpValidation()

    const validations: Validation[] = []
    for (let i = 0; i < ['username', 'email', 'password', 'passwordConfirmation'].length; i++) {
      validations.push(expect.any(RequiredFieldValidation))
    }
    validations.push(expect.any(UsernameValidation))
    validations.push(expect.any(EmailValidation))
    validations.push(expect.any(PasswordValidation))
    validations.push(expect.any(CompareFieldsValidation))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
