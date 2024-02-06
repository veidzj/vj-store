import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountEmailByTokenRepository } from '@/application/protocols/account/queries'
import { type GetAccountEmailByToken } from '@/domain/usecases/account/queries'
import { TokenError, AccessDeniedError } from '@/domain/errors/account'

export class DbGetAccountEmailByToken implements GetAccountEmailByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly getAccountEmailByTokenRepository: GetAccountEmailByTokenRepository
  ) {}

  public async getByToken(accessToken: string, role: string): Promise<string> {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (error) {
      throw new TokenError()
    }

    const email = await this.getAccountEmailByTokenRepository.getByToken(accessToken, role)
    if (!email) {
      throw new AccessDeniedError()
    }
    return email
  }
}
