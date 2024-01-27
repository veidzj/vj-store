import { LogErrorControllerDecorator } from '@/main/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/log'

export class LogErrorControllerDecoratorFactory {
  public static makeLogErrorControllerDecorator = (controller: Controller): Controller => {
    const logErrorMongoRepository = new LogErrorMongoRepository()
    return new LogErrorControllerDecorator(controller, logErrorMongoRepository)
  }
}
