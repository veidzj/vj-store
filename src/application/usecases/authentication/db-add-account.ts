import { type CheckAccountByEmailRepository } from '@/application/protocols/db/static/authentication'
import { type Hasher } from '@/application/protocols/cryptography'
import { type AddAccountRepository } from '@/application/protocols/db/dynamic/authentication'
import { type AddAccount } from '@/domain/usecases/authentication'

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