import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'

export class ChangeAccountPasswordController {
  constructor(private readonly changeAccountPassword: ChangeAccountPassword) {}

  public async handle(request: ChangeAccountPasswordController.Request): Promise<void> {
    await this.changeAccountPassword.changePassword(request.currentPassword, request.newPassword)
  }
}

export namespace ChangeAccountPasswordController {
  export interface Request {
    currentPassword: string
    newPassword: string
  }
}
