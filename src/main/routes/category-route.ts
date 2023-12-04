import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { makeAddCategoryController } from '@/main/factories/controllers/dynamic/category'
import { makeGetAllCategoriesController } from '@/main/factories/controllers/static/category'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/category', adminAuth, ExpressRouteAdapter.adapt(makeAddCategoryController()))
  router.get('/category', ExpressRouteAdapter.adapt(makeGetAllCategoriesController()))
}
