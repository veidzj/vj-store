import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeDbGetProductsByCategory } from '@/main/factories/usecases/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductsByCategoryController } from '@/presentation/controllers/product'

export const makeGetProductsByCategoryController = (): Controller => {
  const controller = new GetProductsByCategoryController(makeDbGetProductsByCategory())
  return makeLogControllerDecorator(controller)
}
