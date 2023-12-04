import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { AddProductControllerFactory, makeUpdateProductController } from '@/main/factories/controllers/dynamic/product'
import { makeGetProductBySlugController, makeGetProductsByCategoryController } from '@/main/factories/controllers/static/product'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/product', adminAuth, ExpressRouteAdapter.adapt(AddProductControllerFactory.makeAddProductController()))
  router.put('/product/:id', adminAuth, ExpressRouteAdapter.adapt(makeUpdateProductController()))
  router.get('/product/slug/:slug', ExpressRouteAdapter.adapt(makeGetProductBySlugController()))
  router.get('/product/category/:category', ExpressRouteAdapter.adapt(makeGetProductsByCategoryController()))
}
