import { type Controller } from '@/presentation/protocols/controller'
import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication } from '@/domain/usecases/authentication'
import { type HttpResponse } from '@/presentation/protocols/http'
import { badRequest, ok, unauthorized } from '@/presentation/helpers/http-helper'

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    const authenticationModel = await this.authentication.auth(request)
    if (!authenticationModel) {
      return unauthorized()
    }
    return ok(authenticationModel)
  }
}
