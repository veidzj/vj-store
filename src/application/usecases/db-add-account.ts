import { type CheckAccountByEmailRepository } from '@/application/protocols/db/check-account-by-email-repository'
import { type Hasher } from '@/application/protocols/cryptography/hasher'
import { type AddAccountRepository } from '@/application/protocols/db/add-account-repository'
import { type AddAccount } from '@/domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public add = async(input: AddAccount.Input): Promise<boolean> => {
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(input.email)
    let isValid = false
    if (!accountExists) {
      const hashedPassword = await this.hasher.hash(input.password)
      isValid = await this.addAccountRepository.add({ ...input, password: hashedPassword })
    }
    return isValid
  }
}
