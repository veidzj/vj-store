import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'
import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class ChangeAccountPasswordController implements Controller {
  constructor(private readonly changeAccountPassword: ChangeAccountPassword) {}

  public async handle(request: ChangeAccountPasswordController.Request): Promise<Response> {
    try {
      await this.changeAccountPassword.changePassword(request.accountEmail, request.currentPassword, request.newPassword)
      return HttpHelper.ok({})
    } catch (error) {
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace ChangeAccountPasswordController {
  export interface Request {
    accountEmail: string
    currentPassword: string
    newPassword: string
  }
}
