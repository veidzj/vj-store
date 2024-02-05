import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { SignUpControllerFactory, SignInControllerFactory } from '@/main/factories/controllers/account/authentication'
import { ChangeEmailControllerFactory } from '@/main/factories/controllers/account/commands'

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
  router.post('/signin', ExpressRouteAdapter.adapt(SignInControllerFactory.makeSignInController()))
  router.put('/change-email', ExpressRouteAdapter.adapt(ChangeEmailControllerFactory.makeChangeEmailController()))
}
