import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountByTokenRepository } from '@/application/protocols/db/static/auth'
import { AccessDeniedError } from '@/application/errors/auth'
import { type GetAccountByToken } from '@/domain/usecases/auth'

export class DbGetAccountByToken implements GetAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly getAccountByTokenRepository: GetAccountByTokenRepository
  ) {}

  public getByToken = async(accessToken: string, role?: string): Promise<GetAccountByToken.Output> => {
    await this.decrypter.decrypt(accessToken)
    const account = await this.getAccountByTokenRepository.getByToken(accessToken, role)
    if (!account) {
      throw new AccessDeniedError()
    }
    return account
  }
}
