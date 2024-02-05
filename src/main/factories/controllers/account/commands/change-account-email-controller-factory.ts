import { ChangeAccountEmailFactory } from '@/main/factories/usecases/account/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { ChangeAccountEmailController } from '@/presentation/controllers/account/commands'

export class ChangeAccountEmailControllerFactory {
  public static readonly makeChangeAccountEmailController = (): Controller => {
    const controller = new ChangeAccountEmailController(ChangeAccountEmailFactory.makeChangeAccountEmail())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
