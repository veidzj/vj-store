import { type Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeAddProductController, makeUpdateProductController } from '@/main/factories/controllers/dynamic/product'
import { makeGetProductBySlugController, makeGetProductsByCategoryController } from '@/main/factories/controllers/static/product'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/product', adminAuth, adaptRoute(makeAddProductController()))
  router.put('/product/:id', adminAuth, adaptRoute(makeUpdateProductController()))
  router.get('/product/slug/:slug', adaptRoute(makeGetProductBySlugController()))
  router.get('/product/category/:category', adaptRoute(makeGetProductsByCategoryController()))
}
