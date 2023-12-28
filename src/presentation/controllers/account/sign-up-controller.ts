import { EntityValidationError } from '@/domain/errors'
import { type AddAccount, type Authentication } from '@/domain/usecases/account'
import { HttpHelper } from '@/presentation/helpers'
import { type Response } from '@/presentation/protocols'

export class SignUpController {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public async handle(request: SignUpController.Request): Promise<Response> {
    try {
      await this.addAccount.add(request)
      await this.authentication.auth({ Email: request.Email, Password: request.Password })
      return {
        statusCode: 200,
        body: {}
      }
    } catch (error) {
      if (error instanceof EntityValidationError) {
        return HttpHelper.badRequest(error)
      }
      return {
        statusCode: 500,
        body: {}
      }
    }
  }
}

export namespace SignUpController {
  export interface Request {
    Username: string
    Email: string
    Password: string
  }
}