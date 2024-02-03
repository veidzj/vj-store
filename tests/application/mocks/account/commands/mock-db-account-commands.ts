import { type AddAccountRepository, type UpdateAccessTokenRepository, type ChangeEmailRepository } from '@/application/protocols/account/commands'

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

export class ChangeEmailRepositorySpy implements ChangeEmailRepository {
  public currentEmail: string
  public newEmail: string

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    this.currentEmail = currentEmail
    this.newEmail = newEmail
  }
}
