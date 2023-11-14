import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountByTokenRepository } from '@/application/protocols/db/static/auth'
import { AccessDeniedError, InvalidTokenError } from '@/application/errors/auth'
import { type GetAccountByToken } from '@/domain/usecases/auth'

export class DbGetAccountByToken implements GetAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly getAccountByTokenRepository: GetAccountByTokenRepository
  ) {}

  public getByToken = async(accessToken: string, role?: string): Promise<GetAccountByToken.Output> => {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (error) {
      throw new InvalidTokenError()
    }

    const account = await this.getAccountByTokenRepository.getByToken(accessToken, role)
    if (!account) {
      throw new AccessDeniedError()
    }
    return account
  }
}
