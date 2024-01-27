import { AddAccountFactory, AuthenticationFactory } from '@/main/factories/usecases/account/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/account'

export class SignUpControllerFactory {
  public static makeSignUpController = (): Controller => {
    const controller = new SignUpController(AddAccountFactory.makeAddAccount(), AuthenticationFactory.makeAuthentication())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
