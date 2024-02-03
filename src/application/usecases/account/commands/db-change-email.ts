import { type ChangeEmail } from '@/domain/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'

export class DbChangeEmail implements ChangeEmail {
  public async change(currentEmail: string, newEmail: string): Promise<void> {
    AccountValidation.validateEmail(currentEmail)
    AccountValidation.validateEmail(newEmail)
  }
}
