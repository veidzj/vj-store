import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type Authentication } from '@/domain/usecases/account/commands'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

export class SignInController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  public async handle(request: SignInController.Request): Promise<Response> {
    try {
      const accessToken = await this.authentication.auth(request)
      return HttpHelper.ok({ accessToken })
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      if (error instanceof InvalidCredentialsError) {
        return HttpHelper.unauthorized(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace SignInController {
  export interface Request {
    email: string
    password: string
  }
}
