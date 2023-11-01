import { type Controller } from '@/presentation/protocols/controller'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication-factory'
import { SignInController } from '@/presentation/controllers/sign-in-controller'
import { makeSignInValidation } from '@/main/factories/controllers/sign-in-validation-factory'

export const makeSignInController = (): Controller => {
  const controller = new SignInController(makeSignInValidation(), makeDbAuthentication())
  return controller
}
