import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type Authentication } from '@/domain/usecases/account'

export class SignInController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  public async handle(request: SignInController.Request): Promise<Response> {
    await this.authentication.auth(request)
    return HttpHelper.ok({})
  }
}

export namespace SignInController {
  export interface Request {
    email: string
    password: string
  }
}
