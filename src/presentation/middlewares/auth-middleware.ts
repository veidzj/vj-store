import { type Middleware, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAccountEmailByToken } from '@/domain/usecases/account/queries'
import { InvalidCredentialsError, TokenError, AccessDeniedError } from '@/domain/errors/account'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly getAccountEmailByToken: GetAccountEmailByToken,
    private readonly role: string
  ) {}

  public async handle(request: AuthMiddleware.Request): Promise<Response> {
    try {
      const { accessToken } = request
      if (!accessToken) {
        return HttpHelper.unauthorized(new InvalidCredentialsError())
      }

      const accountEmail = await this.getAccountEmailByToken.getByToken(accessToken, this.role)
      return HttpHelper.ok({ accountEmail })
    } catch (error) {
      if (error instanceof TokenError) {
        return HttpHelper.unauthorized(error)
      }
      if (error instanceof AccessDeniedError) {
        return HttpHelper.forbidden(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
