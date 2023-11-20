import { makeDbGetAccountByToken } from '@/main/factories/usecases/auth'
import { type Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbGetAccountByToken(), role)
}
