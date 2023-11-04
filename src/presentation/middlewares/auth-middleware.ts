import { type Middleware, type HttpResponse } from '@/presentation/protocols'
import { type GetAccountByToken } from '@/domain/usecases/authentication'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly getAccountByToken: GetAccountByToken,
    private readonly role?: string
  ) {}

  public handle = async(request: AuthMiddleware.Request): Promise<HttpResponse> => {
    await this.getAccountByToken.get(request.accessToken, this.role)
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
