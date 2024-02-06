import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type HashComparer, type Hasher } from '@/application/protocols/cryptography'
import { type ChangeAccountPasswordRepository } from '@/application/protocols/account/commands'
import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

export class DbChangeAccountPassword implements ChangeAccountPassword {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly hasher: Hasher,
    private readonly changeAccountPasswordRepository: ChangeAccountPasswordRepository
  ) {}

  public async changePassword(accountEmail: string, currentPassword: string, newPassword: string): Promise<void> {
    const account = await this.getAccountByEmailRepository.getByEmail(accountEmail)
    if (!account) {
      throw new AccountNotFoundError()
    }
    const isMatch = await this.hashComparer.compare(currentPassword, account.password)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }
    AccountValidation.validatePassword(newPassword)
    const hashedPassword = await this.hasher.hash(newPassword)
    await this.changeAccountPasswordRepository.changePassword(accountEmail, hashedPassword)
  }
}
