import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeAccountEmail } from '@/domain/usecases/account/commands'
import { EntityValidationError } from '@/domain/errors'
import { InvalidCredentialsError, AccountNotFoundError, EmailInUseError } from '@/domain/errors/account'

export class ChangeAccountEmailController implements Controller {
  constructor(private readonly changeAccountEmail: ChangeAccountEmail) {}

  public async handle(request: ChangeAccountEmailController.Request): Promise<Response> {
    try {
      if (request.currentEmail !== request.accountEmail) {
        return HttpHelper.unauthorized(new InvalidCredentialsError())
      }
      await this.changeAccountEmail.changeEmail(request.currentEmail, request.newEmail)
      return HttpHelper.ok({ message: 'Email successfully changed' })
    } catch (error) {
      if (error instanceof EntityValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      if (error instanceof EmailInUseError) {
        return HttpHelper.conflict(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace ChangeAccountEmailController {
  export interface Request {
    currentEmail: string
    newEmail: string
    accountEmail: string
  }
}
