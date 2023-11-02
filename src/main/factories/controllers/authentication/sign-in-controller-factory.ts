import { makeSignInValidation } from '@/main/factories/controllers/authentication'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/authentication'

export const makeSignInController = (): Controller => {
  const controller = new SignInController(makeSignInValidation(), makeDbAuthentication())
  return controller
}
