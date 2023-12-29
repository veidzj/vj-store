import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type Authentication } from '@/domain/usecases/account'

export class DbAuthentication implements Authentication {
  constructor(private readonly getAccountByEmailRepository: GetAccountByEmailRepository) {}

  public async auth(input: Authentication.Input): Promise<string> {
    await this.getAccountByEmailRepository.getByEmail(input.email)
    return await Promise.resolve('')
  }
}
