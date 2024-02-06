import { type AddAccountRepository, type UpdateAccessTokenRepository, type ChangeAccountEmailRepository, type ChangeAccountPasswordRepository } from '@/application/protocols/account/commands'

export class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input

  public async add(input: AddAccountRepository.Input): Promise<void> {
    this.input = input
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  public input: UpdateAccessTokenRepository.Input

  public async updateAccessToken(input: UpdateAccessTokenRepository.Input): Promise<void> {
    this.input = input
  }
}

export class ChangeAccountEmailRepositorySpy implements ChangeAccountEmailRepository {
  public currentEmail: string
  public newEmail: string

  public async changeEmail(currentEmail: string, newEmail: string): Promise<void> {
    this.currentEmail = currentEmail
    this.newEmail = newEmail
  }
}

export class ChangeAccountPasswordRepositorySpy implements ChangeAccountPasswordRepository {
  public accountEmail: string
  public newPassword: string

  public async changePassword(accountEmail: string, newPassword: string): Promise<void> {
    this.accountEmail = accountEmail
    this.newPassword = newPassword
  }
}
