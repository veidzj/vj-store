import { type AddAccount } from '@/domain/usecases/account'
import { type AddAccountRepository } from '@/application/protocols/account'
import { Account } from '@/domain/entities/account'

export class DbAddAccount implements AddAccount {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}

  public async add(input: AddAccount.Input): Promise<void> {
    const account = new Account(input.Username, input.Email, input.Password)
    await this.addAccountRepository.add(account)
  }
}
