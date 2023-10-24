import { type GetAccountByEmailRepository } from 'application/protocols/db/get-account-by-email-repository'
import { type Authentication } from 'domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository
  ) {}

  public auth = async(input: Authentication.Input): Promise<Authentication.Output | null> => {
    await this.getAccountByEmailRepository.getByEmail(input.email)
    return null
  }
}
