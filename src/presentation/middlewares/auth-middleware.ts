import { type Middleware, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAccountByToken } from '@/domain/usecases/auth'
import { AuthenticationError, AuthorizationError } from '@/domain/errors'
import { InvalidCredentialsError } from '@/application/errors/auth'

export class AuthMiddleware implements Middleware {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly getAccountByToken: GetAccountByToken,
    private readonly role?: string
  ) {}

  public handle = async(request: AuthMiddleware.Request): Promise<HttpResponse> => {
    try {
      const { accessToken } = request
      if (!accessToken) {
        return this.httpHelper.unauthorized(new InvalidCredentialsError())
      }

      const account = await this.getAccountByToken.getByToken(accessToken, this.role)
      return this.httpHelper.ok({ accountId: account.id })
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return this.httpHelper.unauthorized(error)
      }
      if (error instanceof AuthorizationError) {
        return this.httpHelper.forbidden(error)
      }
      return this.httpHelper.serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
