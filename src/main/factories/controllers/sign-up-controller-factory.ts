import { type Controller } from '@/presentation/protocols/controller'
import { SignUpController } from '@/presentation/controllers/sign-up-controller'
import { makeSignUpValidation } from '@/main/factories/controllers/sign-up-validation-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
  return controller
}
