import { type AddAccountRepository, type UpdateAccessTokenRepository } from '@/application/protocols/account/commands'
import { type Account } from '@/domain/entities/account'

export class AddAccountRepositorySpy implements AddAccountRepository {
  public account: Account

  public async add(account: Account): Promise<void> {
    this.account = account
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  public input: UpdateAccessTokenRepository.Input

  public async updateAccessToken(input: UpdateAccessTokenRepository.Input): Promise<void> {
    this.input = input
  }
}
