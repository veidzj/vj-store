import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type ChangeAccountEmailRepository } from '@/application/protocols/account/commands'
import { type ChangeAccountEmail } from '@/domain/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError, EmailInUseError } from '@/domain/errors/account'

export class DbChangeAccountEmail implements ChangeAccountEmail {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly changeAccountEmailRepository: ChangeAccountEmailRepository
  ) {}

  public async changeEmail(currentEmail: string, newEmail: string): Promise<void> {
    const accountWithCurrentEmailExists = await this.checkAccountByEmailRepository.checkByEmail(currentEmail)
    if (!accountWithCurrentEmailExists) {
      throw new AccountNotFoundError()
    }
    AccountValidation.validateEmail(newEmail)
    const accountWithNewEmailExists = await this.checkAccountByEmailRepository.checkByEmail(newEmail)
    if (accountWithNewEmailExists) {
      throw new EmailInUseError()
    }
    await this.changeAccountEmailRepository.changeEmail(currentEmail, newEmail)
  }
}
