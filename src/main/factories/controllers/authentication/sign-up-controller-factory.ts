import { makeSignUpValidation } from '@/main/factories/validations/authentication'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases/authentication'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/authentication'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
