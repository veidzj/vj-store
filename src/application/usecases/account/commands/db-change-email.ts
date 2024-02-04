import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type ChangeEmailRepository } from '@/application/protocols/account/commands'
import { type ChangeEmail } from '@/domain/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError } from '@/domain/errors/account'

export class DbChangeEmail implements ChangeEmail {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly changeEmailRepository: ChangeEmailRepository
  ) {}

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    AccountValidation.validateEmail(currentEmail)
    AccountValidation.validateEmail(newEmail)
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(currentEmail)
    if (!accountExists) {
      throw new AccountNotFoundError()
    }
    await this.changeEmailRepository.change(currentEmail, newEmail)
  }
}
