import { type Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { EmailValidation } from '@/validation/validators/auth'
import { EmailValidatorAdapter } from '@/infra/validators'

export class SignInValidationFactory {
  public static makeSignInValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
  }
}
