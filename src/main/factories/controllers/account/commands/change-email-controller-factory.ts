import { ChangeEmailFactory } from '@/main/factories/usecases/account/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { ChangeEmailController } from '@/presentation/controllers/account/commands'

export class ChangeEmailControllerFactory {
  public static readonly makeChangeEmailController = (): Controller => {
    const controller = new ChangeEmailController(ChangeEmailFactory.makeChangeEmail())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
