import { type Middleware, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAccountByToken } from '@/domain/usecases/static/auth'
import { AuthenticationError, AuthorizationError } from '@/domain/errors'
import { InvalidCredentialsError } from '@/application/errors/auth'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly getAccountByToken: GetAccountByToken,
    private readonly role: string
  ) {}

  public handle = async(request: AuthMiddleware.Request): Promise<Response> => {
    try {
      const { accessToken } = request
      if (!accessToken) {
        return HttpHelper.unauthorized(new InvalidCredentialsError())
      }

      const account = await this.getAccountByToken.getByToken(accessToken, this.role)
      return HttpHelper.ok({ accountId: account.id })
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return HttpHelper.unauthorized(error)
      }
      if (error instanceof AuthorizationError) {
        return HttpHelper.forbidden(error)
      }
      return HttpHelper.serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
