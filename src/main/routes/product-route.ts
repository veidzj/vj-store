import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { adminAuth } from '@/main/middlewares/account'
import { AddProductControllerFactory, UpdateProductControllerFactory } from '@/main/factories/controllers/product/commands'
import { GetLatestProductsControllerFactory, GetProductsWithDiscountControllerFactory, GetProductsByCategoryControllerFactory, GetProductBySlugControllerFactory } from '@/main/factories/controllers/product/queries'

export default (router: Router): void => {
  router.post('/product', adminAuth, ExpressRouteAdapter.adapt(AddProductControllerFactory.makeAddProductController()))
  router.put('/product/:id', adminAuth, ExpressRouteAdapter.adapt(UpdateProductControllerFactory.makeUpdateProductController()))
  router.get('/product/latest', ExpressRouteAdapter.adapt(GetLatestProductsControllerFactory.makeGetLatestProductsController()))
  router.get('/product/discount', ExpressRouteAdapter.adapt(GetProductsWithDiscountControllerFactory.makeGetProductsWithDiscountController()))
  router.get('/product/category/:category', ExpressRouteAdapter.adapt(GetProductsByCategoryControllerFactory.makeGetProductsByCategoryController()))
  router.get('/product/:slug', ExpressRouteAdapter.adapt(GetProductBySlugControllerFactory.makeGetProductBySlugController()))
}
