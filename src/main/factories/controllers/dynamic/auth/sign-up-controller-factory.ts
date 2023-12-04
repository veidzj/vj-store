import { makeSignUpValidation } from '@/main/factories/validations/auth'
import { makeDbAddAccount } from '@/main/factories/usecases/dynamic/auth'
import { makeDbAuthentication } from '@/main/factories/usecases/static/auth'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/dynamic/auth'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}