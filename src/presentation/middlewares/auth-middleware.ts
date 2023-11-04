import { type Middleware, type HttpResponse } from '@/presentation/protocols'
import { type GetAccountByToken } from '@/domain/usecases/authentication'
import { HttpHelper } from '../helpers'
import { AccessDeniedError } from '../errors'

export class AuthMiddleware implements Middleware {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly getAccountByToken: GetAccountByToken,
    private readonly role?: string
  ) {}

  public handle = async(request: AuthMiddleware.Request): Promise<HttpResponse> => {
    const accountId = await this.getAccountByToken.get(request.accessToken, this.role)
    if (!accountId) {
      return this.httpHelper.forbidden(new AccessDeniedError())
    }
    return {
      statusCode: 500,
      body: ''
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken: string
  }
}
