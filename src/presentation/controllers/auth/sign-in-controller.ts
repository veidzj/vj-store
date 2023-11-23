import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type Authentication } from '@/domain/usecases/auth'
import { AuthenticationError, ValidationError } from '@/domain/errors'

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignInController.Request): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)

      const authenticationModel = await this.authentication.auth(request)
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

export namespace SignInController {
  export interface Request {
    email: string
    password: string
  }
}
