import { makeSignUpValidation } from '@/main/factories/controllers/authentication'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases/authentication'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/authentication'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
  return controller
}
