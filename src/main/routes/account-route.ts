import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { SignUpControllerFactory, SignInControllerFactory } from '@/main/factories/controllers/account'

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
  router.post('/signin', ExpressRouteAdapter.adapt(SignInControllerFactory.makeSignInController()))
}
