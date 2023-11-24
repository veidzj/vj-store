import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddProductController, makeUpdateProductController } from '@/main/factories/controllers/product'
import { adminAuth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/product', adminAuth, adaptRoute(makeAddProductController()))
  router.put('/product/:productId', adminAuth, adaptRoute(makeUpdateProductController()))
}
