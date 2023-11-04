import { ValidationComposite, EmailValidation, RequiredFieldValidation } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'
import { makeSignUpValidation } from '@/main/factories/validations/authentication'

jest.mock('@/validation/validators/validation-composite')

describe('SignInValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fieldName: 'email', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'password', validate: expect.any(Function) }),
        expect.objectContaining({ emailValidator: expect.any(Object), field: 'email', validate: expect.any(Function) })
      ])
    )
  })
})