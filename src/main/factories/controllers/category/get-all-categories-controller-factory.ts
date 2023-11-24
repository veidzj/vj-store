import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { GetAllCategoriesController } from '@/presentation/controllers/category'
import { makeDbGetAllCategories } from '@/main/factories/usecases/category'

export const makeGetAllCategoriesController = (): Controller => {
  const controller = new GetAllCategoriesController(makeDbGetAllCategories())
  return makeLogControllerDecorator(controller)
}
