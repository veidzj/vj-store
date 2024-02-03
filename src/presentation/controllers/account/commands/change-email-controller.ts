import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeEmail } from '@/domain/usecases/account/commands'
import { EntityValidationError } from '@/domain/errors'
import { AccountNotFoundError } from '@/domain/errors/account'

export class ChangeEmailController implements Controller {
  constructor(private readonly changeEmail: ChangeEmail) {}

  public async handle(request: ChangeEmailController.Request): Promise<Response> {
    try {
      await this.changeEmail.change(request.currentEmail, request.newEmail)
      return HttpHelper.ok({ message: 'Email successfully changed' })
    } catch (error) {
      if (error instanceof EntityValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
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
