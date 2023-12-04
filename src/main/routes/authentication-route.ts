import { type Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/controllers/dynamic/auth'
import { makeSignInController } from '@/main/factories/controllers/static/auth'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
}
