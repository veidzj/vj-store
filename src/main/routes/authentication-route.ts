import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/controllers/dynamic/auth'
import { makeSignInController } from '@/main/factories/controllers/static/auth'

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter.adapt(makeSignUpController()))
  router.post('/signin', ExpressRouteAdapter.adapt(makeSignInController()))
}
