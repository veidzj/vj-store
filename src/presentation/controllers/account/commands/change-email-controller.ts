import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeEmail } from '@/domain/usecases/account/commands'

export class ChangeEmailController implements Controller {
  constructor(private readonly changeEmail: ChangeEmail) {}

  public async handle(request: ChangeEmailController.Request): Promise<Response> {
    try {
      await this.changeEmail.change(request.currentEmail, request.newEmail)
      return HttpHelper.ok({})
    } catch (error) {
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace ChangeEmailController {
  export interface Request {
    currentEmail: string
    newEmail: string
  }
}
