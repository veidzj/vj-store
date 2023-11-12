import { type Middleware, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { type GetAccountByToken } from '@/domain/usecases/auth'
import { AuthenticationError } from '@/domain/errors'

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
        return this.httpHelper.unauthorized(new AccessDeniedError())
      }

      const account = await this.getAccountByToken.getByToken(accessToken, this.role)
      return this.httpHelper.ok({ accountId: account.id })
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return this.httpHelper.unauthorized(new AccessDeniedError())
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
