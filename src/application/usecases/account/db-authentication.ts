import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type HashComparer } from '@/application/protocols/cryptography'
import { AccountNotFoundError } from '@/domain/errors/account'
import { type Authentication } from '@/domain/usecases/account'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  public async auth(input: Authentication.Input): Promise<string> {
    const account = await this.getAccountByEmailRepository.getByEmail(input.email)
    if (!account) {
      throw new AccountNotFoundError()
    }

    await this.hashComparer.compare(input.password, account.getPassword())
    return await Promise.resolve('')
  }
}
