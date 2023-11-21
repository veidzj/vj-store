import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController } from '@/main/factories/controllers/category'

export default (router: Router): void => {
  router.post('/category', adaptRoute(makeAddCategoryController()))
}
