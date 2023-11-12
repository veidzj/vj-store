import { type CheckAccountByEmailRepository } from '@/application/protocols/db/static/auth'
import { type Hasher } from '@/application/protocols/cryptography'
import { type AddAccountRepository } from '@/application/protocols/db/dynamic/auth'
import { type AddAccount } from '@/domain/usecases/auth'
import { EmailInUseError } from '@/application/errors/auth/email-in-use-error'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public add = async(input: AddAccount.Input): Promise<boolean> => {
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(input.email)
    if (accountExists) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hasher.hash(input.password)
    return await this.addAccountRepository.add({ ...input, password: hashedPassword })
  }
}
