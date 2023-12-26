import { type AddAccount } from '@/domain/usecases/account'
import { type AddAccountRepository } from '@/application/protocols/account'

export class DbAddAccount implements AddAccount {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}

  public async add(input: AddAccount.Input): Promise<void> {
    await this.addAccountRepository.add(input)
  }
}
