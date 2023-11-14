import { type GetAccountByEmailRepository } from '@/application/protocols/db/static/auth'
import { type HashComparer, type Encrypter } from '@/application/protocols/cryptography'
import { type Authentication } from '@/domain/usecases/auth'
import { type UpdateAccessTokenRepository } from '@/application/protocols/db/dynamic/auth'
import { AccountNotFoundError, InvalidCredentialsError } from '@/application/errors/auth'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  public auth = async(input: Authentication.Input): Promise<Authentication.Output> => {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)
    if (!account) {
      throw new AccountNotFoundError()
    }

    const isMatch = await this.hashComparer.compare(input.password, account.password)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken({ id: account.id, token: accessToken })
    return {
      username: account.username,
      accessToken
    }
  }
}
