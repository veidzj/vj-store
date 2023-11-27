import { type Controller, type Validation, type Response } from '@/presentation/protocols'
import { type SignUpControllerRequest } from '@/presentation/protocols/auth'
import { HttpHelper } from '@/presentation/helpers'
import { type AddAccount, type Authentication } from '@/domain/usecases/auth'
import { AuthenticationError, ValidationError } from '@/domain/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignUpControllerRequest): Promise<Response> => {
    try {
      this.validation.validate(request)

      const { username, email, password } = request
      await this.addAccount.add({ username, email, password })

      const authenticationModel = await this.authentication.auth({ email, password })
      return HttpHelper.ok(authenticationModel)
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
