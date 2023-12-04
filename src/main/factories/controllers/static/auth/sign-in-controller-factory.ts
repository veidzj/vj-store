import { makeSignInValidation } from '@/main/factories/validations/auth'
import { makeDbAuthentication } from '@/main/factories/usecases/static/auth'
import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/dynamic/auth'

export class SignInControllerFactory {
  public static makeSignInController = (): Controller => {
    const controller = new SignInController(makeSignInValidation(), makeDbAuthentication())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
