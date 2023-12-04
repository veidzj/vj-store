import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { GetProductBySlugFactory } from '@/main/factories/usecases/static/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductBySlugController } from '@/presentation/controllers/static/product'

export class GetProductBySlugControllerFactory {
  public static makeGetProductBySlugController = (): Controller => {
    const controller = new GetProductBySlugController(GetProductBySlugFactory.makeGetProductBySlug())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
