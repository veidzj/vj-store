import { type Middleware, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { type GetAccountByToken } from '@/domain/usecases/authentication'

export class AuthMiddleware implements Middleware {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly getAccountByToken: GetAccountByToken,
    private readonly role?: string
  ) {}

  public handle = async(request: AuthMiddleware.Request): Promise<HttpResponse> => {
    try {
      const accountId = await this.getAccountByToken.get(request.accessToken, this.role)
      if (!accountId) {
        return this.httpHelper.forbidden(new AccessDeniedError())
      }
      return this.httpHelper.ok({ accountId })
    } catch (error) {
      return this.httpHelper.serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken: string
  }
}
