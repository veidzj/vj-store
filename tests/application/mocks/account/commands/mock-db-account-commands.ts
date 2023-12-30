import { type AddAccountRepository, type UpdateAccessTokenRepository } from '@/application/protocols/account/commands'

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
