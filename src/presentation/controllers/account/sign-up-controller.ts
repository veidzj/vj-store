import { type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddAccount, type Authentication } from '@/domain/usecases/account/commands'
import { EntityValidationError } from '@/domain/errors'
import { EmailInUseError, AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

export class SignUpController {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public async handle(request: SignUpController.Request): Promise<Response> {
    try {
      await this.addAccount.add(request)
      const accessToken = await this.authentication.auth({ email: request.email, password: request.password })
      return HttpHelper.ok({ accessToken })
    } catch (error) {
      if (error instanceof EntityValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof EmailInUseError) {
        return HttpHelper.conflict(error)
      }
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

export namespace SignUpController {
  export interface Request {
    username: string
    email: string
    password: string
  }
}
