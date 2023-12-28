import { type AddAccount, type Authentication } from '@/domain/usecases/account'

export class SignUpController {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public async handle(request: SignUpController.Request): Promise<void> {
    await this.addAccount.add(request)
    await this.authentication.auth({ Email: request.Email, Password: request.Password })
  }
}

export namespace SignUpController {
  export interface Request {
    Username: string
    Email: string
    Password: string
  }
}
