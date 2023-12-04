import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeDbGetProductBySlug } from '@/main/factories/usecases/static/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductBySlugController } from '@/presentation/controllers/static/product'

export class GetProductBySlugControllerFactory {
  public static makeGetProductBySlugController = (): Controller => {
    const controller = new GetProductBySlugController(makeDbGetProductBySlug())
    return makeLogControllerDecorator(controller)
  }
}
