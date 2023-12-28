import { type AddAccount } from '@/domain/usecases/account'

export class SignUpController {
  constructor(private readonly addAccount: AddAccount) {}

  public async handle(request: SignUpController.Request): Promise<void> {
    await this.addAccount.add(request)
  }
}

export namespace SignUpController {
  export interface Request {
    Username: string
    Email: string
    Password: string
  }
}
