import { makeDbGetAccountByToken } from '@/main/factories/usecases/static/auth'
import { type Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'

export class AuthMiddlewareFactory {
  public static makeAuthMiddleware = (role: string): Middleware => {
    return new AuthMiddleware(makeDbGetAccountByToken(), role)
  }
}
