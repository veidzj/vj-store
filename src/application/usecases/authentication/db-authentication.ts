import { type GetAccountByEmailRepository } from '@/application/protocols/db/static/authentication'
import { type HashComparer, type Encrypter } from '@/application/protocols/cryptography'
import { type Authentication } from '@/domain/usecases/authentication'
import { type UpdateAccessTokenRepository } from '@/application/protocols/db/dynamic/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  public auth = async(input: Authentication.Input): Promise<Authentication.Output | null> => {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)

    if (account) {
      const isValid = await this.hashComparer.compare(input.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken({ id: account.id, token: accessToken })
        return {
          username: account.username,
          accessToken
        }
      }
    }

    return null
  }
}
