import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountIdByTokenRepository } from '@/application/protocols/account/queries'
import { type GetAccountIdByToken } from '@/domain/usecases/account'
import { TokenError } from '@/domain/errors/account'

export class DbGetAccountIdByToken implements GetAccountIdByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly getAccountIdByTokenRepository: GetAccountIdByTokenRepository
  ) {}

  public async getByToken(accessToken: string, role: string): Promise<string> {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (error) {
      throw new TokenError()
    }

    await this.getAccountIdByTokenRepository.getByToken(accessToken, role)
    return await Promise.resolve('')
  }
}
