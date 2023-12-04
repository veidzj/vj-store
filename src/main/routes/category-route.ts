import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { AddCategoryControllerFactory } from '@/main/factories/controllers/dynamic/category'
import { GetAllCategoriesControllerFactory } from '@/main/factories/controllers/static/category'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/category', adminAuth, ExpressRouteAdapter.adapt(AddCategoryControllerFactory.makeAddCategoryController()))
  router.get('/category', ExpressRouteAdapter.adapt(GetAllCategoriesControllerFactory.makeGetAllCategoriesController()))
}
