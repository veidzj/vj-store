import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { AddProductControllerFactory } from '@/main/factories/controllers/product'
import { adminAuth } from '@/main/middlewares/account'

export default (router: Router): void => {
  router.post('/product', adminAuth, ExpressRouteAdapter.adapt(AddProductControllerFactory.makeAddProductController()))
}
