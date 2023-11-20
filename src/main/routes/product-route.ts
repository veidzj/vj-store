import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddProductController } from '@/main/factories/controllers/product'

export default (router: Router): void => {
  router.post('/product', adaptRoute(makeAddProductController()))
}
