import { type Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController } from '@/main/factories/controllers/dynamic/category'
import { makeGetAllCategoriesController } from '@/main/factories/controllers/static/category'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/category', adminAuth, adaptRoute(makeAddCategoryController()))
  router.get('/category', adaptRoute(makeGetAllCategoriesController()))
}
