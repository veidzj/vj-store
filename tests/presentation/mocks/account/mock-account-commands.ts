import { type ChangeAccountEmail, type ChangeAccountPassword } from '@/domain/usecases/account/commands'

export class ChangeAccountEmailSpy implements ChangeAccountEmail {
  public currentEmail: string
  public newEmail: string

  public async changeEmail(currentEmail: string, newEmail: string): Promise<void> {
    this.currentEmail = currentEmail
    this.newEmail = newEmail
  }
}

export class ChangeAccountPasswordSpy implements ChangeAccountPassword {
  public accountEmail: string
  public currentPassword: string
  public newPassword: string

  public async changePassword(accountEmail: string, currentPassword: string, newPassword: string): Promise<void> {
    this.accountEmail = accountEmail
    this.currentPassword = currentPassword
    this.newPassword = newPassword
  }
}
