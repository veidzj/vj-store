import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type HashComparer, type Encrypter } from '@/application/protocols/cryptography'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'
import { type Authentication } from '@/domain/usecases/account'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  public async auth(input: Authentication.Input): Promise<string> {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)
    if (!account) {
      throw new AccountNotFoundError()
    }

    const isMatch = await this.hashComparer.compare(input.password, account.getPassword())
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }

    await this.encrypter.encrypt(account.getId())
    return await Promise.resolve('')
  }
}
