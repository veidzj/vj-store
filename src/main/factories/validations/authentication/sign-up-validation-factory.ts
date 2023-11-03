import { type Validation } from '@/presentation/protocols'
import { UsernameValidatorAdapter, EmailValidatorAdapter } from '@/infra/validators'
import {
  RequiredFieldValidation,
  UsernameValidation,
  EmailValidation,
  PasswordValidation,
  CompareFieldsValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
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
