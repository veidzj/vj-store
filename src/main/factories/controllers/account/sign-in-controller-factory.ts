import { AuthenticationFactory } from '@/main/factories/usecases/account/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/account'

export class SignInControllerFactory {
  public static readonly makeSignInController = (): Controller => {
    const controller = new SignInController(AuthenticationFactory.makeAuthentication())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
