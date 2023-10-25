import { type Authentication } from '../../domain/usecases/authentication'
import { type GetAccountByEmailRepository } from '../protocols/db/get-account-by-email-repository'
import { type HashComparer } from '../protocols/cryptography/hash-comparer'
import { type Encrypter } from '../protocols/cryptography/encrypter'

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
          name: account.name,
          accessToken
        }
      }
    }

    return null
  }
}
