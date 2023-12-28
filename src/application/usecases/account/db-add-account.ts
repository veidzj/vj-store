import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type Hasher } from '@/application/protocols/cryptography'
import { type AddAccountRepository } from '@/application/protocols/account/commands'
import { EmailInUseError } from '@/application/errors/account'
import { type AddAccount } from '@/domain/usecases/account'
import { Account } from '@/domain/entities/account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<void> {
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(input.Email)
    if (accountExists) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hasher.hash(input.Password)
    const account = new Account(input.Username, input.Email, hashedPassword)
    await this.addAccountRepository.add(account)
  }
}
