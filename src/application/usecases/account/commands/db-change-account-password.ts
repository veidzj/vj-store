import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type ChangeAccountPasswordRepository } from '@/application/protocols/account/commands'
import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'
import { AccountNotFoundError } from '@/domain/errors/account'
import { AccountValidation } from '@/domain/entities/account'

export class DbChangeAccountPassword implements ChangeAccountPassword {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly changeAccountPasswordRepository: ChangeAccountPasswordRepository
  ) {}

  public async changePassword(accountEmail: string, currentPassword: string, newPassword: string): Promise<void> {
    const account = await this.getAccountByEmailRepository.getByEmail(accountEmail)
    if (!account) {
      throw new AccountNotFoundError()
    }
    AccountValidation.validatePassword(newPassword)
    await this.changeAccountPasswordRepository.changePassword(accountEmail, newPassword)
  }
}
