import { makeSignInValidation } from '@/main/factories/validations/authentication'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/authentication'

export const makeSignInController = (): Controller => {
  const controller = new SignInController(makeSignInValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
