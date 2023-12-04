import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { AddProductControllerFactory, UpdateProductControllerFactory } from '@/main/factories/controllers/dynamic/product'
import { GetProductBySlugControllerFactory, GetProductsByCategoryControllerFactory, GetProductsWithDiscountControllerFactory } from '@/main/factories/controllers/static/product'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/product', adminAuth, ExpressRouteAdapter.adapt(AddProductControllerFactory.makeAddProductController()))
  router.put('/product/:id', adminAuth, ExpressRouteAdapter.adapt(UpdateProductControllerFactory.makeUpdateProductController()))
  router.get('/product/slug/:slug', ExpressRouteAdapter.adapt(GetProductBySlugControllerFactory.makeGetProductBySlugController()))
  router.get('/product/category/:category', ExpressRouteAdapter.adapt(GetProductsByCategoryControllerFactory.makeGetProductsByCategoryController()))
  router.get('/product/discount', ExpressRouteAdapter.adapt(GetProductsWithDiscountControllerFactory.makeGetProductsWithDiscountController()))
}
