import { makeSignInValidation } from '@/main/factories/validations/auth'
import { makeDbAuthentication } from '@/main/factories/usecases/auth'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/auth'

export const makeSignInController = (): Controller => {
  const controller = new SignInController(makeSignInValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
