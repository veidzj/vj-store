import { GetProductBySlugFactory } from '@/main/factories/usecases/product/queries'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { GetProductBySlugController } from '@/presentation/controllers/product/queries'

export class GetProductBySlugControllerFactory {
  public static readonly makeGetProductBySlugController = (): Controller => {
    const controller = new GetProductBySlugController(GetProductBySlugFactory.makeGetProductBySlug())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
