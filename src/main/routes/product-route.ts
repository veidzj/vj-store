import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { AddProductControllerFactory, UpdateProductControllerFactory } from '@/main/factories/controllers/product/commands'
import { adminAuth } from '@/main/middlewares/account'
import { GetLatestProductsControllerFactory } from '../factories/controllers/product/queries'

export default (router: Router): void => {
  router.post('/product', adminAuth, ExpressRouteAdapter.adapt(AddProductControllerFactory.makeAddProductController()))
  router.put('/product/:id', adminAuth, ExpressRouteAdapter.adapt(UpdateProductControllerFactory.makeUpdateProductController()))
  router.get('/product/latest', ExpressRouteAdapter.adapt(GetLatestProductsControllerFactory.makeGetLatestProductsController()))
}
