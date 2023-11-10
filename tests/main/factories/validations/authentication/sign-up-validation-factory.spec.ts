import { makeSignUpValidation } from '@/main/factories/validations/authentication'
import { ValidationComposite, EmailValidation, CompareFieldsValidation, RequiredFieldValidation } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['username', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fieldName: 'username', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'email', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'password', validate: expect.any(Function) }),
        expect.objectContaining({ fieldName: 'passwordConfirmation', validate: expect.any(Function) }),
        expect.objectContaining({ field: 'password', fieldToCompare: 'passwordConfirmation', validate: expect.any(Function) }),
        expect.objectContaining({ usernameValidator: expect.any(Object), field: 'username', validate: expect.any(Function) }),
        expect.objectContaining({ field: 'password', validate: expect.any(Function) }),
        expect.objectContaining({ emailValidator: expect.any(Object), field: 'email', validate: expect.any(Function) })
      ])
    )
  })
})
