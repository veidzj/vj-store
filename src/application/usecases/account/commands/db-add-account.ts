import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type Hasher } from '@/application/protocols/cryptography'
import { type AddAccountRepository } from '@/application/protocols/account/commands'
import { Account } from '@/domain/entities/account'
import { type AddAccount } from '@/domain/usecases/account/commands'
import { EmailInUseError } from '@/domain/errors/account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<void> {
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(input.email)
    if (accountExists) {
      throw new EmailInUseError()
    }
    const account = new Account(input.username, input.email, input.password)
    const hashedPassword = await this.hasher.hash(input.password)
    account.setPassword(hashedPassword)
    const addAccountInputRepository = this.makeAddAccountInputRepository(account)
    await this.addAccountRepository.add(addAccountInputRepository)
  }

  private makeAddAccountInputRepository(account: Account): AddAccountRepository.Input {
    return {
      id: account.getId(),
      username: account.getUsername(),
      email: account.getEmail(),
      password: account.getPassword(),
      role: account.getRole(),
      isActive: account.getIsActive(),
      createdAt: account.getCreatedAt(),
      updateHistory: []
    }
  }
}
