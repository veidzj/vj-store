import { type GetAccountByEmailRepository } from '@/application/protocols/db/get-account-by-email-repository'
import { type HashComparer } from '@/application/protocols/cryptography/hash-comparer'
import { type Encrypter } from '@/application/protocols/cryptography/encrypter'
import { type Authentication } from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  public auth = async(input: Authentication.Input): Promise<Authentication.Output | null> => {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)

    if (account) {
      const isValid = await this.hashComparer.compare(input.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        return {
          username: account.username,
          accessToken
        }
      }
    }

    return null
  }
}
