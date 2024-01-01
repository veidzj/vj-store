import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { SignUpControllerFactory } from '@/main/factories/controllers/account'

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
}
