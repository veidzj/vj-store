import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type ChangeAccountEmailRepository } from '@/application/protocols/account/commands'
import { type ChangeAccountEmail } from '@/domain/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError } from '@/domain/errors/account'

export class DbChangeAccountEmail implements ChangeAccountEmail {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly changeAccountEmailRepository: ChangeAccountEmailRepository
  ) {}

  public async changeEmail(currentEmail: string, newEmail: string): Promise<void> {
    AccountValidation.validateEmail(currentEmail)
    AccountValidation.validateEmail(newEmail)
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(currentEmail)
    if (!accountExists) {
      throw new AccountNotFoundError()
    }
    await this.changeAccountEmailRepository.changeEmail(currentEmail, newEmail)
  }
}
