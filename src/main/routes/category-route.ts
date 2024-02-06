import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { adminAuth } from '@/main/middlewares/account'
import { AddCategoryControllerFactory, UpdateCategoryControllerFactory } from '@/main/factories/controllers/category/commands'
import { GetAllCategoriesControllerFactory } from '@/main/factories/controllers/category/queries'

export default (router: Router): void => {
  router.post('/category', adminAuth, ExpressRouteAdapter.adapt(AddCategoryControllerFactory.makeAddCategoryController()))
  router.put('/category/:id', adminAuth, ExpressRouteAdapter.adapt(UpdateCategoryControllerFactory.makeUpdateCategoryController()))
  router.get('/category', ExpressRouteAdapter.adapt(GetAllCategoriesControllerFactory.makeGetAllCategoriesController()))
}
