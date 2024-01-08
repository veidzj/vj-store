import { GetAccountIdByTokenFactory } from '@/main/factories/usecases/account/queries'
import { type Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'

export class AuthMiddlewareFactory {
  public static makeAuthMiddleware = (role: string): Middleware => {
    return new AuthMiddleware(GetAccountIdByTokenFactory.makeGetAccountIdByToken(), role)
  }
}
