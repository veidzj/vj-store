import { makeSignUpValidation } from '@/main/factories/validations/auth'
import { makeDbAddAccount } from '@/main/factories/usecases/dynamic/auth'
import { makeDbAuthentication } from '@/main/factories/usecases/static/auth'
import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/dynamic/auth'

export class SignUpControllerFactory {
  public static makeSignUpController = (): Controller => {
    const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
