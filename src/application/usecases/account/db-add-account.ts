import { type AddAccount } from '@/domain/usecases/account'
import { type CheckAccountByEmailRepository, type AddAccountRepository } from '@/application/protocols/account'
import { Account } from '@/domain/entities/account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<void> {
    await this.checkAccountByEmailRepository.checkByEmail(input.Email)
    const account = new Account(input.Username, input.Email, input.Password)
    await this.addAccountRepository.add(account)
  }
}
