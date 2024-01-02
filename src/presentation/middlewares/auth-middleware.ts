import { type Middleware, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAccountIdByToken } from '@/domain/usecases/account'
import { InvalidCredentialsError } from '@/domain/errors/account'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly getAccountIdByToken: GetAccountIdByToken,
    private readonly role: string
  ) {}

  public async handle(request: AuthMiddleware.Request): Promise<Response> {
    const { accessToken } = request
    if (!accessToken) {
      return HttpHelper.unauthorized(new InvalidCredentialsError())
    }

    await this.getAccountIdByToken.getByToken(accessToken, this.role)
    return HttpHelper.ok({})
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
