import { ChangeAccountPasswordFactory } from '@/main/factories/usecases/account/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { ChangeAccountPasswordController } from '@/presentation/controllers/account/commands'

export class ChangeAccountPasswordControllerFactory {
  public static readonly makeChangeAccountPasswordController = (): Controller => {
    const controller = new ChangeAccountPasswordController(ChangeAccountPasswordFactory.makeChangeAccountPassword())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
