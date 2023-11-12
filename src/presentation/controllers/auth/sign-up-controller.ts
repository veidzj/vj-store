import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddAccount, type Authentication } from '@/domain/usecases/auth'
import { AuthenticationError, ValidationError } from '@/domain/errors'

export class SignUpController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignUpController.Request): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)

      const { username, email, password } = request
      await this.addAccount.add({ username, email, password })

      const authenticationModel = await this.authentication.auth({ email, password })
      return this.httpHelper.ok(authenticationModel)
    } catch (error) {
      if (error instanceof ValidationError) {
        return this.httpHelper.badRequest(error)
      }
      if (error instanceof AuthenticationError) {
        return this.httpHelper.forbidden(error)
      }
      return this.httpHelper.serverError(error)
    }
  }
}

export namespace SignUpController {
  export interface Request {
    username: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
