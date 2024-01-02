import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountIdByToken } from '@/domain/usecases/account'
import { TokenError } from '@/domain/errors/account'

export class DbGetAccountIdByToken implements GetAccountIdByToken {
  constructor(private readonly decrypter: Decrypter) {}

  public async getByToken(accessToken: string, role: string): Promise<string> {
    try {
      await this.decrypter.decrypt(accessToken)
    } catch (error) {
      throw new TokenError()
    }
    return await Promise.resolve('')
  }
}
