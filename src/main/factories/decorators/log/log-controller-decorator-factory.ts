import { LogControllerDecorator } from '@/main/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { LogMongoRepository } from '@/infra/db/mongodb/dynamic/log'

export class LogControllerDecoratorFactory {
  public static makeLogControllerDecorator = (controller: Controller): Controller => {
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(controller, logMongoRepository)
  }
}
