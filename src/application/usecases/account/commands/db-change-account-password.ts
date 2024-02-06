import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'

export class DbChangeAccountPassword implements ChangeAccountPassword {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  public async changePassword(accountEmail: string, currentPassword: string, newPassword: string): Promise<void> {
    await this.checkAccountByEmailRepository.checkByEmail(accountEmail)
  }
}
