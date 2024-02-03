import { type ChangeEmail } from '@/domain/usecases/account/commands'

export class ChangeEmailController {
  constructor(private readonly changeEmail: ChangeEmail) {}

  public async handle(request: ChangeEmailController.Request): Promise<void> {
    await this.changeEmail.change(request.currentEmail, request.newEmail)
  }
}

export namespace ChangeEmailController {
  export interface Request {
    currentEmail: string
    newEmail: string
  }
}
