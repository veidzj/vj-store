import { type Controller } from '@/presentation/protocols/controller'
import { type Validation } from '@/presentation/protocols/validation'
import { type HttpResponse } from '@/presentation/protocols/http'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { type AddAccount } from '@/domain/usecases/add-account'
import { type Authentication } from '@/domain/usecases/authentication'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public handle = async(request: SignUpController.Request): Promise<HttpResponse> => {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = request
      const isValid = await this.addAccount.add({ name, email, password })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }

      const authenticationModel = await this.authentication.auth({ email, password })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export interface Request {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
