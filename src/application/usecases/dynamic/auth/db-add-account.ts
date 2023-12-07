import { type CheckAccountByEmailRepository } from '@/application/protocols/db/static/auth'
import { type Hasher } from '@/application/protocols/cryptography'
import { type AddAccountRepository } from '@/application/protocols/db/dynamic/auth'
import { EmailInUseError } from '@/application/errors/auth/email-in-use-error'
import { type AddAccount } from '@/domain/usecases/dynamic/auth'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public add = async(input: AddAccount.Input): Promise<void> => {
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(input.email)
    if (accountExists) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hasher.hash(input.password)
    await this.addAccountRepository.add({ ...input, password: hashedPassword })
  }
}
