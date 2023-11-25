import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeDbGetAllProducts } from '@/main/factories/usecases/product'
import { type Controller } from '@/presentation/protocols'
import { GetAllProductsController } from '@/presentation/controllers/product'

export const makeGetAllProductsController = (): Controller => {
  const controller = new GetAllProductsController(makeDbGetAllProducts())
  return makeLogControllerDecorator(controller)
}
