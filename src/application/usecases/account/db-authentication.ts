import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { AccountNotFoundError } from '@/domain/errors/account'
import { type Authentication } from '@/domain/usecases/account'

export class DbAuthentication implements Authentication {
  constructor(private readonly getAccountByEmailRepository: GetAccountByEmailRepository) {}

  public async auth(input: Authentication.Input): Promise<string> {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)
    if (!account) {
      throw new AccountNotFoundError()
    }
    return await Promise.resolve('')
  }
}
