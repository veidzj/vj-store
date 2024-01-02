import { type Middleware, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { InvalidCredentialsError } from '@/domain/errors/account'

export class AuthMiddleware implements Middleware {
  public async handle(request: AuthMiddleware.Request): Promise<Response> {
    const { accessToken } = request
    if (!accessToken) {
      return HttpHelper.unauthorized(new InvalidCredentialsError())
    }
    return HttpHelper.ok({})
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
