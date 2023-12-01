import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeDbGetAllCategories } from '@/main/factories/usecases/category'
import { type Controller } from '@/presentation/protocols'
import { GetAllCategoriesController } from '@/presentation/controllers/static/category'

export const makeGetAllCategoriesController = (): Controller => {
  const controller = new GetAllCategoriesController(makeDbGetAllCategories())
  return makeLogControllerDecorator(controller)
}
