import { type Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, CompareFieldsValidation, ValidationComposite } from '@/validation/validators'
import { UsernameValidation, EmailValidation, PasswordValidation } from '@/validation/validators/auth'
import { UsernameValidatorAdapter, EmailValidatorAdapter } from '@/infra/validators'

export class SignUpValidationFactory {
  public static makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['username', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new UsernameValidation('username', new UsernameValidatorAdapter()))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    validations.push(new PasswordValidation('password'))
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    return new ValidationComposite(validations)
  }
}
