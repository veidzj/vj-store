import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { badRequest, unauthorized, ok, serverError } from '@/presentation/helpers'
import { type Authentication } from '@/domain/usecases/authentication'

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignInController.Request): Promise<HttpResponse> => {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignInController {
  export interface Request {
    email: string
    password: string
  }
}
