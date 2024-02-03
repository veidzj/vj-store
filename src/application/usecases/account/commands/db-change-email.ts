import { type ChangeEmailRepository } from '@/application/protocols/account/commands'
import { type ChangeEmail } from '@/domain/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'

export class DbChangeEmail implements ChangeEmail {
  constructor(private readonly changeEmailRepository: ChangeEmailRepository) {}

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    AccountValidation.validateEmail(currentEmail)
    AccountValidation.validateEmail(newEmail)

    await this.changeEmailRepository.change(currentEmail, newEmail)
  }
}
