import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { AddCategoryControllerFactory } from '@/main/factories/controllers/category'
import { adminAuth } from '@/main/middlewares/account'

export default (router: Router): void => {
  router.post('/category', adminAuth, ExpressRouteAdapter.adapt(AddCategoryControllerFactory.makeAddCategoryController()))
}
