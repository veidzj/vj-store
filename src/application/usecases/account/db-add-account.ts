import { type CheckAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type Hasher } from '@/application/protocols/cryptography'
import { type AddAccountRepository } from '@/application/protocols/account/commands'
import { EmailInUseError } from '@/domain/errors/account'
import { type AddAccount } from '@/domain/usecases/account'
import { Account } from '@/domain/entities/account'

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
    const hashedPassword = await this.hasher.hash(input.password)
    const account = new Account(input.username, input.email, hashedPassword)
    const addAccountInputRepository: AddAccountRepository.Input = {
      id: account.getId(),
      username: account.getUsername(),
      email: account.getEmail(),
      password: account.getPassword(),
      role: account.getRole(),
      isActive: account.getIsActive(),
      createdAt: account.getCreatedAt(),
      updateHistory: account.getUpdateHistory()
    }
    await this.addAccountRepository.add(addAccountInputRepository)
  }
}
