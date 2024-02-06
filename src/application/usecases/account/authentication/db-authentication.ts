import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type HashComparer, type Encrypter } from '@/application/protocols/cryptography'
import { type UpdateAccessTokenRepository } from '@/application/protocols/account/commands'
import { type Authentication } from '@/domain/usecases/account/authentication'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  public async auth(input: Authentication.Input): Promise<string> {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)
    if (!account) {
      throw new AccountNotFoundError()
    }

    const isMatch = await this.hashComparer.compare(input.password, account.password)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken({ id: account.id, accessToken })
    return accessToken
  }
}
