import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController, makeGetCategoriesController } from '@/main/factories/controllers/category'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/category', adminAuth, adaptRoute(makeAddCategoryController()))
  router.get('/category', adaptRoute(makeGetCategoriesController()))
}
