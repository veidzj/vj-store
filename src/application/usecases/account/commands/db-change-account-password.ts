import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type ChangeAccountPasswordRepository } from '@/application/protocols/account/commands'
import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'
import { AccountNotFoundError } from '@/domain/errors/account'

export class DbChangeAccountPassword implements ChangeAccountPassword {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly changeAccountPasswordRepository: ChangeAccountPasswordRepository
  ) {}

  public async changePassword(accountEmail: string, currentPassword: string, newPassword: string): Promise<void> {
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(accountEmail)
    if (!accountExists) {
      throw new AccountNotFoundError()
    }
    await this.changeAccountPasswordRepository.changePassword(accountEmail, currentPassword, newPassword)
  }
}
