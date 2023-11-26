import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeDbGetProductBySlug } from '@/main/factories/usecases/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductBySlugController } from '@/presentation/controllers/product'

export const makeGetProductBySlugController = (): Controller => {
  const controller = new GetProductBySlugController(makeDbGetProductBySlug())
  return makeLogControllerDecorator(controller)
}
