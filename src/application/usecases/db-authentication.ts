import { type Authentication } from '../../domain/usecases/authentication'
import { type GetAccountByEmailRepository } from '../protocols/db/get-account-by-email-repository'
import { type HashComparer } from '../protocols/cryptography/hash-comparer'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  public auth = async(input: Authentication.Input): Promise<Authentication.Output | null> => {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)

    if (account) {
      await this.hashComparer.compare(input.password, account.password)
    }

    return null
  }
}
