import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type Authentication } from '@/domain/usecases/authentication'

export class SignInController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignInController.Request): Promise<HttpResponse> => {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return this.httpHelper.badRequest(error)
      }

      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return this.httpHelper.unauthorized()
      }
      return this.httpHelper.ok(authenticationModel)
    } catch (error) {
      return this.httpHelper.serverError(error)
    }
  }
}

export namespace SignInController {
  export interface Request {
    email: string
    password: string
  }
}
