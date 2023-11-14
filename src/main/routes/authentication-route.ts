import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeSignUpController, makeSignInController } from '@/main/factories/controllers/auth'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
}
