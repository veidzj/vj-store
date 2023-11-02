import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { type AddAccount, type Authentication } from '@/domain/usecases/authentication'

export class SignUpController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignUpController.Request): Promise<HttpResponse> => {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return this.httpHelper.badRequest(error)
      }

      const { username, email, password } = request
      const isValid = await this.addAccount.add({ username, email, password })
      if (!isValid) {
        return this.httpHelper.forbidden(new EmailInUseError())
      }

      const authenticationModel = await this.authentication.auth({ email, password })
      return this.httpHelper.ok(authenticationModel)
    } catch (error) {
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
