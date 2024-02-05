import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { userAuth } from '@/main/middlewares/account'
import { SignUpControllerFactory, SignInControllerFactory } from '@/main/factories/controllers/account/authentication'
import { ChangeAccountEmailControllerFactory } from '@/main/factories/controllers/account/commands'

export default (router: Router): void => {
  router.post('/account/signup', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
  router.post('/account/signin', ExpressRouteAdapter.adapt(SignInControllerFactory.makeSignInController()))
  router.put('/account/change-email', userAuth, ExpressRouteAdapter.adapt(ChangeAccountEmailControllerFactory.makeChangeAccountEmailController()))
}
