import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeAddProductValidation } from '@/main/factories/validations/product'
import { makeDbUpdateProduct } from '@/main/factories/usecases/dynamic/product'
import { type Controller } from '@/presentation/protocols'
import { UpdateProductController } from '@/presentation/controllers/dynamic/product'

export const makeUpdateProductController = (): Controller => {
  const controller = new UpdateProductController(makeAddProductValidation(), makeDbUpdateProduct())
  return makeLogControllerDecorator(controller)
}
