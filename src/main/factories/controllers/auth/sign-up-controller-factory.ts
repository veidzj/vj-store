import { makeSignUpValidation } from '@/main/factories/validations/auth'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases/auth'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/auth'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
