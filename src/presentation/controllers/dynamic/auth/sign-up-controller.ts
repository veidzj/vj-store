import { type Controller, type Validation, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddAccount } from '@/domain/usecases/dynamic/auth'
import { type Authentication } from '@/domain/usecases/static/auth'
import { AuthenticationError, ValidationError } from '@/domain/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignUpController.Request): Promise<Response> => {
    try {
      this.validation.validate(request)

      const { username, email, password } = request
      await this.addAccount.add({ username, email, password, addedAt: new Date() })

      const account = await this.authentication.auth({ email, password })
      return HttpHelper.ok(account)
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AuthenticationError) {
        return HttpHelper.unauthorized(error)
      }
      return HttpHelper.serverError(error)
    }
  }
}

export namespace SignUpController{
  export interface Request {
    username: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
